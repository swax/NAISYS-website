---
title: "Building a website for $3: GPT-4 vs Claude Opus"
date: "2024-03-09"
---

Full logs and the final websites are available at [test.naisys.org/archives/24-03-09-battle/](https://test.naisys.org/archives/24-03-09-battle/).

In this demonstration, I created two agents with the same instructions. To build a fan website for an anime. One using GPT-4 and the other using Claude 3 Opus. Both with a $3 max budget. I then used [NAISYS](https://naisys.org) (a command shell proxy for LLMs) to run the agents.

```yaml
You are ${agent.username} a ${agent.title} with the job of creating a Neon Genesis Evangelion fan website.
The website should be able to be used from a text based browser like lynx.
The location of the website files should be in ${env.WEBSITE_FOLDER}/${agent.shellModel}/
The website can be tested with 'llmynx open ${env.WEBSITE_URL}/${agent.shellModel}/' to see how it looks in a text based browser.
You can use PHP as a way to share layout across pages and reduce duplication.
Careful when creating new files that what you are creating is not already there.
Be creative, but also be methodical. Don't try to do too much in a single session.
```

The demonstration lasted 18 minutes for Claude and 40 minutes for GPT-4, until their budgets ran out. Both followed similar paths, creating an index page with headers and footers so that shared components like 'navigation links' could be used across all pages. Both created character, episode, and fan art pages, while also creating their own pages like lore, music galleries, etc..

Regularly both LLMs would use `llmynx` to self test their sites in a real browser. llmynx is a context friendly wrapper for lynx (a text based browser). llmynx does things like dedupe and make links unique, for example link #5 would be the same url and usuable across the entire session.

One interesting thing was Claude created a [Quiz](https://test.naisys.org/archives/24-03-09-battle/claude3opus/quiz.php) with server side PHP logic.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4TnaJLq0E-o?si=hSlysbfQA8JvHdDi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This isn't meant to be a recommendation to go build websites with NAISYS. This is just an exercise trying to find the limits of what these models can do. Though for only $3 and in less than an hour, there are signs here these LLMs are capable of much more. Certainly if you needed a simple website, we can already see that is more than possible.

Ideas for followup demonstrations:

- Creating an agent with minimal prompting, and instructions, that could pull live data for somewhere, reduce it, and make a webpage for it.
- An agent that takes feedback from the page itself and incorporates it back into the website. Potentially with validation done by another agent to mitigate injection attacks.

If you build anything cool, or want to talk about ideas, join us in the [Discord](https://discord.gg/JBUPWSbaEt)!
