import Image from "next/image";
import Link from "next/link";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { SystemDiagram } from "./SystemDiagram";

const footerLinks = [
  {
    href: "https://github.com/swax/NAISYS",
    text: "GitHub",
    icon: "bi-github",
  },
  {
    href: "https://www.npmjs.com/package/naisys",
    text: "NPM",
    icon: "bi-box-seam",
  },
  {
    href: "https://discord.gg/JBUPWSbaEt",
    text: "Discord",
    icon: "bi-discord",
  },
];

const quickStartCommand =
  "npm install naisys @naisys/hub @naisys/supervisor @naisys/erp\nnpx naisys --integrated-hub --supervisor --erp";

const hostCommand = "npm install naisys\nnpx naisys --hub=https://<server>/hub";

const clusterSteps = [
  "Start the integrated server on one machine.",
  "Expose it to your group with a reverse proxy or tunnel.",
  "Create user accounts and assign permissions.",
  "Have each person attach the machines they can contribute.",
];

const packages = [
  {
    name: "naisys",
    role: "Agent runner",
    description:
      "Starts agents, connects to a hub, and gives them tools on the local host.",
    href: "https://github.com/swax/NAISYS/tree/main/apps/naisys",
  },
  {
    name: "@naisys/hub",
    role: "Central server",
    description:
      "Persists logs, mail, costs, variables, users, config, and host state.",
    href: "https://github.com/swax/NAISYS/tree/main/apps/hub",
  },
  {
    name: "@naisys/supervisor",
    role: "Browser UI",
    description:
      "Manages agents, hosts, users, permissions, model settings, runs, and live activity.",
    href: "https://github.com/swax/NAISYS/tree/main/apps/supervisor",
  },
  {
    name: "@naisys/erp",
    role: "Task system",
    description:
      "Optional AI-readable order and operations layer for structured work.",
    href: "https://github.com/swax/NAISYS/tree/main/apps/erp",
  },
];

const agentFeatures = [
  {
    title: "Agent coordination",
    body: "Agents can spawn helpers, send mail, keep short-form chats, and recover missed messages across machines.",
    commands: ["ns-agent", "ns-mail", "ns-chat", "ns-users"],
  },
  {
    title: "Web and browser work",
    body: "Use a context-friendly text browser for research or drive headless Chromium with selectors and screenshots.",
    commands: ["ns-lynx", "ns-browser"],
  },
  {
    title: "Computer use",
    body: "Give agents screenshots, clicks, keys, focus control, generated images, image inspection, and audio listening.",
    commands: ["ns-desktop", "ns-look", "ns-genimg", "ns-listen"],
  },
  {
    title: "Shell and workspace",
    body: "Run real commands, use TTY-aware processes for sudo or ssh, and keep per-agent file lists cache-friendly.",
    commands: ["ns-cmd", "ns-pty", "ns-workspace"],
  },
  {
    title: "Session control",
    body: "Pause, compact, wait, inspect context, adjust config for the current run, and capture agent comments.",
    commands: ["ns-session", "ns-context", "ns-config", "ns-comment"],
  },
  {
    title: "Cost and host state",
    body: "Track token usage, apply spend limits, check hub connection, and see which hosts are available.",
    commands: ["ns-cost", "ns-host", "ns-hub"],
  },
];

const details = [
  "Node.js 22 or newer is required on every machine.",
  "The setup wizard writes local config and prints the Supervisor URL.",
  "Hosts stay replaceable; the hub keeps the organization history.",
  "For production, back up the NAISYS folder, especially database and cert data.",
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="max-w-full overflow-x-auto rounded-md border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
      <code>{children}</code>
    </pre>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950"
      id="top"
    >
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 sm:gap-5">
              <Image
                alt="NAISYS logo"
                className="h-16 w-16 rounded-md border border-slate-200 sm:h-[92px] sm:w-[92px]"
                priority
                src="/naisys-logo.webp"
                width="96"
                height="96"
              />
              <div>
                <h1 className="text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                  NAISYS
                </h1>
                <p className="mt-1 text-sm text-slate-600 md:text-base">
                  Networked Agents Interface System
                </p>
              </div>
            </div>
            <p className="mt-4 text-2xl leading-8 text-slate-700">
              A self-hosted system for pooling machines, model accounts, and
              work into one shared organization of humans and AI agents.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Run a local server, open the browser UI, create agents, invite
              people, and let everyone add the machines they can contribute.
              Agents can run anywhere in the cluster or be pinned to hosts with
              the right files, GPU, desktop, browser, OS, or hardware.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-slate-800"
                href="https://github.com/swax/NAISYS"
              >
                <i className="bi bi-github" aria-hidden="true"></i>
                Read the README
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 no-underline hover:border-slate-500"
                href="#start"
              >
                <i className="bi bi-terminal" aria-hidden="true"></i>
                Start here
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200" id="start">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-5 py-10 sm:px-8 md:py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Start here
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Bring up the integrated server first.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              This starts the hub, Supervisor, and optional ERP together. The
              first-run wizard creates config, then prints the local Supervisor
              URL for the browser UI.
            </p>
          </div>
          <div className="min-w-0 space-y-4">
            <CodeBlock>{quickStartCommand}</CodeBlock>
            <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {details.map((detail) => (
                <li className="flex gap-2" key={detail}>
                  <i
                    className="bi bi-check2 mt-0.5 text-teal-700"
                    aria-hidden="true"
                  ></i>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-5 py-10 sm:px-8 md:py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Build a shared cluster
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Add hosts when the work needs more machines.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A laptop can handle chat or code agents, a GPU box can serve
              local models, a Windows desktop can run computer-use tasks, and a
              VM can take always-on background work.
            </p>
          </div>
          <div className="min-w-0">
            <ol className="divide-y divide-slate-200 rounded-md border border-slate-200 bg-slate-50">
              {clusterSteps.map((step, index) => (
                <li className="flex gap-3 p-4" key={step}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                    {index + 1}
                  </span>
                  <span className="leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Attach a host
              </p>
              <CodeBlock>{hostCommand}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200" id="architecture">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Architecture
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              One organization, many replaceable hosts.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The hub keeps state. Supervisor and ERP expose the control
              surface. Hosts contribute execution environments. Agents run
              close to the files, browsers, desktops, and hardware they need.
            </p>
          </div>
          <SystemDiagram />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white" id="capabilities">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              What it does
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Practical controls you can inspect.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The Supervisor and ERP keep capabilities visible: agents, runs,
              hosts, costs, variables, browser work, desktop control, model
              choice, and structured operations stay inspectable from the UI.
            </p>
          </div>

          <ScreenshotGallery />
        </div>
      </section>

      <section className="border-b border-slate-200" id="features">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Runner features
            </p>
            <h2
              className="mt-2 text-3xl font-semibold text-slate-950"
              id="features-heading"
            >
              What agents can actually do.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The runner proxies a real shell to the model and adds
              context-friendly `ns-*` commands for coordination, browsing,
              desktop control, media, session management, and cost visibility.
            </p>
          </div>

          <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agentFeatures.map((feature) => (
              <article
                className="rounded-md border border-slate-200 bg-slate-50 p-5"
                key={feature.title}
              >
                <h3 className="font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {feature.commands.map((command) => (
                    <code
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-xs text-slate-700"
                      key={command}
                    >
                      {command}
                    </code>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 max-w-full rounded-md border border-slate-200 bg-white p-5">
            <div className="grid min-w-0 gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-center">
              <div>
                <h3 className="font-semibold text-slate-950">
                  Model and platform coverage
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Hosted models, OpenRouter, and local LLMs can share the same
                  runner surface.
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                NAISYS supports Anthropic, OpenAI, Google, Grok, OpenRouter,
                local models, and human-managed agents. Desktop control can run
                on Linux, Windows, and macOS depending on host dependencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white" id="packages">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Packages
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Packages you can run together or independently.
            </h2>
          </div>
          <div className="mt-6 grid gap-3 md:hidden">
            {packages.map((pkg) => (
              <article
                className="rounded-md border border-slate-200 bg-white p-4"
                key={pkg.name}
              >
                <a
                  className="font-mono text-sm font-semibold text-teal-700 no-underline hover:text-teal-900"
                  href={pkg.href}
                >
                  {pkg.name}
                </a>
                <p className="mt-2 font-medium text-slate-900">{pkg.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {pkg.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden max-w-full overflow-x-auto rounded-md border border-slate-200 bg-white md:block">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Package
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Role
                  </th>
                  <th className="px-4 py-3 font-semibold" scope="col">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {packages.map((pkg) => (
                  <tr key={pkg.name}>
                    <td className="px-4 py-4 align-top font-mono text-slate-950">
                      <a
                        className="text-teal-700 no-underline hover:text-teal-900"
                        href={pkg.href}
                      >
                        {pkg.name}
                      </a>
                    </td>
                    <td className="px-4 py-4 align-top font-medium text-slate-800">
                      {pkg.role}
                    </td>
                    <td className="px-4 py-4 align-top leading-6 text-slate-600">
                      {pkg.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-slate-600 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-950">NAISYS</p>
            <p className="mt-1">MIT licensed and built in the open.</p>
          </div>
          <nav aria-label="Footer links" className="flex flex-wrap gap-3">
            <a
              className="font-medium text-slate-700 no-underline hover:text-slate-950"
              href="#top"
            >
              Back to top
            </a>
            {footerLinks.map((link) => (
              <a
                className="inline-flex items-center gap-1.5 font-medium text-slate-700 no-underline hover:text-slate-950"
                href={link.href}
                key={link.href}
              >
                <i className={`bi ${link.icon}`} aria-hidden="true"></i>
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
