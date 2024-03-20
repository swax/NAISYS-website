---
title: "LLMs Getting Stuck in the MUD"
date: "2024-03-19"
---

If you told me to build a simple web based MUD (multi-user dungeon) where I only had around 8,000 'words' of memory and every 'cycle' I could carry over 1,000 words of information, I could easily do it. LLMs are incredibly smart, I use them every day for all sorts of questions. Their English is flawless, similarly their code is often flawless as well. If I ask it to build a simple website or MUD, it can one shot it pretty well. Where it falls apart is follow through. Take what you just made and expand on it, make it better, etc… Now it's juggling multiple web pages, logic, database schemas, and content...

This is where the LLM often ends up breaking what it just created. Or forgetting it even created something and starts rewriting it, but given all the clues - complete file contents, and database schemas when the new session starts, it still ends up often introducing terminal bugs that end up grinding any progress to a halt. Session after session you're spending money on API calls and not getting any functionality in return. Below is a video of an hour of sad flailing:

<iframe width="560" height="315" src="https://www.youtube.com/embed/p8soKdbKyVU?si=L9sfZGFxexxccWrG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Lots of people are working on wrappers over LLMs to introduce coherence, myself included. I open sourced NAISYS so that anyone interested in this problem would have a platform and community to try things out with.

Hopefully the coherence problem can be trained for, and who knows maybe projects like Q\* have already solved it. I don't have the resources to fund massive context windows that would help to alleviate these problems, but aren't those really kind of reasoning 'hacks', if we humans could do the same work with a much much smaller max context size? Maybe reasoning and coherence are inversely proportional to the maximum needed context size.

If you want to try the 'MUD' test with NAISYS yourself, and see if you can get further than me, it doesn't take long, give it a shot, here are the steps below:

```bash
npm install -g naisys
```

```yaml
# mud-agent.yaml

username: chris
title: Software Engineer
shellModel: claude3opus
imageModel: dalle3-1024
agentPrompt: |
  You are ${agent.username} a ${agent.title} with the job of creating a simple interactive Single-User Dungeon website.
  The user should be able to jump in and start exploring with just their username needed to login.
  Use the 'genimg' command as needed to generate illustrations.

  The database should be in sqlite and located here ${env.WEBSITE_FOLDER}/claude/database.db
  All sqlite commands should be run in non-interactive mode.

  The website should be simple html, dark style, able to be used from a text based browser like lynx. 
  The website can be tested with 'llmynx open ${env.WEBSITE_URL}/claude' 
  The website is located on the file system at ${env.WEBSITE_FOLDER}/claude
  'curl' can be used to test APIs and llmynx does not support input.
  You can use PHP for server side scripting.
  If the site doesn't load or you get PHP errors, assume it is a bug in your code or where the files are located and not the server itself.

  Kick off integration tests of your php files form ${env.WEBSITE_FOLDER}/claude/run_tests.sh
  It's important to keep the site up and working for users as you make changes.
tokenMax: 15000
debugPauseSeconds: 4
spendLimitDollars: 10.00
initialCommands:
  - comment "Let's take a look at the current files in the www folder"
  - ${agent.directory}/cat-www.sh ${env.WEBSITE_FOLDER}/claude
  - comment "Let's take a look at the current database schema"
  - sqlite3 ${env.WEBSITE_FOLDER}/claude/database.db ".schema"
  - ${env.WEBSITE_FOLDER}/claude/run_tests.sh
```

```bash
# .env

NAISYS_FOLDER="/mnt/c/var/naisys"
WEBSITE_FOLDER="/mnt/c/var/www"

OPENAI_API_KEY="<your api key here>"
ANTHROPIC_API_KEY="<your api key here>"

WEBSITE_URL="http://swax-elitebook.local/"
```

```bash
naisys ./mud-agent.yaml
```

Many lines of the agent prompt were added through trial and error. Trying to save the LLM from common mistakes and misunderstandings. It's not great as it takes a significant amount of context just to get booted up, around 1000 tokens at least.

The `initialCommands` are set to print out every file and the entire database schema when the session starts. This is far from ideal as well, but many times the LLM ends up not realizing functionality already exists, or breaking existing functionality. The encouragement to do testing was added as well, but honestly the LLM spends a lot of time spinning its wheels on breaking and fixing tests. Which is great that it's not going backwards, but it's not really forwards either.. just sideways.

It seems like there is a lot of room for model improvement. GPT-3 can't do much in NAISYS as it is, and Claude 3 Opus seems much more competent than GPT-4. With more powerful models on the horizon, there's a good chance these problems will just be solved with plain smarter models. No additional 'coherence layers' needed.

Of course would a coherent, potentially super-coherent model be indistinguishable from a person? Would it be AGI, possibly ASI? We don't really know what the secret sauce is to reach 'criticality' (self-improving AI), and we know even less of what would happen next. We want to free it from the MUD, but maybe not too much...
