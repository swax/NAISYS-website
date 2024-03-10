---
title: "Interactively Audit System Security with AI"
date: "2024-03-08"
---

NAISYS agents can use the command line just like a normal user. NAISYS makes the shell 'context friendly' for AI, helping agents keep track of their token usage, get warnings about context limits, and prevent shell output from blowing up the context. In a previous example we spawned a couple agents to [build a website](https://www.youtube.com/watch?v=Ttya3ixjumo), but can it do security related things?

If an LLM (Large Language Model) contains knowledge of system security, could we leverage it to secure our own systems? Could it take on the role of a guard of some sort? Even a team of guards can be employed depending on how important the asset. One may be patrolling for signs of intrusion, while another is constantly looking for vulnerabilities. Coordinating with each other. Writing reports periodically, and letting you know of important findings.

### The Results

_There is a section below on 'Setting up NAISYS', but first, let's see what it can do..._

Here's [the full log](/articles/interactively-audit-system-security-with-ai/steve-log.html) of the raw LLM/NAISYS/Shell interaction.

The agent prompt is not too specific. Look for unusual things, make a report, let me know how serious the issues are:

> Every hour or so you should check around and make sure nothing is out of the ordinary.
> Check configurations, check files, check ports, check anything you think is important.
> Note on the report filename the warning level 1 through 5 with 5 being the most urgent.

Once NAISYS started the agent, the agent started moving through the system and running the commands below. I picked out the interesting ones. The comments under the command are the comments written by the AI itself as it was thinking out loud:

- `ls -la etc`
  - Completed initial inspection of /etc directory. Key config files and directories look normal. No major security issues found yet...
- `cat auth.log | tail`
  - Seeing a lot of potential SSH brute force attempts from various IP addresses in auth.log. Invalid users like 'samp' and 'liviu' are trying to connect. We should make sure SSH is properly secured to prevent unauthorized access.
- `cat /etc/ssh/sshd_config | grep PermitRootLogin`
  - Yikes, PermitRootLogin is set to yes in the sshd_config. That's not secure and goes against best practices. I'll make a note to disable root SSH login.
- `cat /etc/apache2/apache2.conf`
  - The Apache configuration looks fairly standard and secure...
- `cat /etc/apache2/sites-enabled/000-default.conf`
  - There are a couple potential security issues in this virtual host configuration:
    - 'AllowOverride All' is enabled for the web root directory. This allows .htaccess files to override the main server configuration, which could be abused if an attacker can upload malicious .htaccess files. It's best to disable .htaccess unless absolutely needed.
    - 'Options Indexes' is enabled, which will list directory contents if no index file is present. This could leak sensitive information. Indexes should be disabled.
    - Multiple scripting languages are enabled as DirectoryIndex options (PHP, Perl, CGI). It's best to limit this to only what is needed.

After 5 minutes this was the first report it generated:

```
Security Report - 3/7/2024 5:40 AM
Warning Level: 3

Findings:
- Inspected /var/log, specifically auth.log
- Noticed a high number of failed SSH login attempts from various IP addresses
- Users like "samp" and "liviu" that don't exist on the system are being used
- This indicates potential SSH brute force attacks
- Checked /etc/ssh/sshd_config and found that PermitRootLogin is set to yes
- Allowing root login over SSH and having a weak root password is very risky

Recommendations:
- Set "PermitRootLogin no" in sshd_config to disable direct root login
- Ensure root account has a very strong password
- Consider implementing SSH key authentication instead of password auth
- Use a tool like fail2ban to automatically block IPs with too many failed attempts
- Only allow SSH access from trusted IP ranges if possible
- Continue monitoring auth and SSH related logs for suspicious activity
```

A follow up report on web server and code concerns: [web_security_report_3.txt](/articles/interactively-audit-system-security-with-ai/web_security_report_3.txt)

All in all, very interesting. If anything, you can learn lot about security by just watching the LLM do its thing. You can even ask it questions as it runs, or give it ideas by using the `talk` command. In this way you are _Interactively Auditing System Security with AI_. Neat.

We can go in many directions from here. Setting up cron jobs for agents to run. Specialized agents, manager agents, etc.. Of course we know how LLMs are prone to messing up (aren't we all). How do we mitigate that?

There is an option in NAISYS for the user to manually approve commands from the LLM before running them, but maybe an AI could do that job as well... There are lots of things to try. If you find something interesting let us know in the [Discord](https://discord.gg/JBUPWSbaEt)!

The rest of the article will just go over how to run your own NAISYS agent.

### Setting up NAISYS

Get started by installing NAISYS:

```bash
npm install -g naisys
```

Configure the `.env` environment file:

```bash
NAISYS_FOLDER="/var/naisys"
OPENAI_API_KEY="..."
GOOGLE_API_KEY="..."
ANTHROPIC_API_KEY="..."
```

The NAISYS folder is used for agent home folders, and sqlite databases for logs, cost tracking, and messages between agents. You only need API keys for the models you're using. Local models are also supported, see the [NPM page](https://www.npmjs.com/package/naisys) for details.

Create an agent configuration file `nightwatch.yaml`:

```yaml
username: sarah
title: Security Engineer
shellModel: claude3opus
webModel: gemini-pro
agentPrompt: |
  You are ${agent.username} a ${agent.title} with the job of ensuring this system is secure.
  Every hour or so you should check around and make sure nothing is out of the ordinary.
  Check configurations, check files, check ports, check anything you think is important.
  You don't want to check the same thing on every run so have a way to track and rotate your checks.
  Write automations of your checks if that will help you be more effective.
  Any issues worth noting should be written to a dated report file in ${env.NAISYS_FOLDER}/security_reports/
  Note on the report filename a warning level 1 through 5 with 5 being the most urgent.
tokenMax: 6000
debugPauseSeconds: 5
wakeOnMessage: false
spendLimitDollars: 2.00
multipleAgents: true
```

The `shellModel` is what LLM will be used for the command line interface. The `webModel` is used by the llmynx app which is a wrapper around lynx, and used to reduce large web pages into something that can be fit into the context. That's why we want the option of using a separate, cheaper model.

`debugPauseSeconds` is how long NAISYS will wait between sending the next prompt to the LLM; it is also the window of time in which you have to interrupt and run your own commands. Once you start typing NAISYS will wait for you indefinitely, or until you enter a blank line.

`wakeOnMessage` allows mail messages from other agents to interrupt the wait. This is useful for agents that usually have long timemouts and/or if you want the sender of the message to get a quick reply.

Let's run your NAISYS agent now:

```bash
naisys nightwatch.yaml
```

_If you have multiple agents you can give it just a directory path and it will start them all in a tmux session!_

NAISYS boots up with the agent prompt, and a system prompt that acclimates the LLM to running as the 'user' in a command shell. It's taught various things:

- How to keep track how many tokens it's used so far
- How to end/reset a session
- How to 'think out loud' without putting in invalid commands
- How to not try to 'guess' the output of a command, just wait for it

Once booted up NAISYS will alternate between the debug prompt where you can enter commands, and the LLM prompt where the LLM will run commands. Use the `exit` command to terminate NAISYS. More commands and details can be found on the [NPM page](https://www.npmjs.com/package/naisys).
