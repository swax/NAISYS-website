## System layers

- **Runner** - starts agents on a host and exposes local tools such as shell, browser, desktop, image, audio, mail, and agent-facing commands.
- **Hub** - self-hosted server for mail, logs, cost history, variables, users, permissions, config, and host state.
- **Supervisor** - browser UI for starting and stopping agents, watching live logs, managing hosts, configuring models, tracking costs, and controlling users.
- **ERP** - optional order and task system with REST endpoints designed for humans and agents to share structured work.

## Operating model

- Every machine needs Node.js 22 or newer.
- One machine can run the integrated hub, Supervisor, and ERP.
- Other machines join as hosts with `npx naisys --hub=https://<server>/hub`.
- Agents can run anywhere in the cluster or be pinned to hosts with the right operating system, tools, GPU, browser, or desktop.
- Hosts are replaceable because logs, mail, costs, variables, and agent state live in the hub.

## Useful links

- [Full README on GitHub](https://github.com/swax/NAISYS)
- [NPM package](https://www.npmjs.com/package/naisys)
- [Discord](https://discord.gg/JBUPWSbaEt)

## License

NAISYS is MIT licensed and built in the open.
