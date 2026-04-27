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

const hackableSteps = [
  {
    title: "Run from your fork",
    body: "Use your own git clone for the server and hosts when you want the cluster to track your changes instead of an npm release.",
  },
  {
    title: "Change what you need",
    body: "Add tools, workflows, UI, or agent behavior in a readable TypeScript codebase, then merge upstream when you want the latest release work.",
  },
  {
    title: "Roll out one commit",
    body: "Set a target npm version or commit hash in Supervisor. Hosts pull, build, and restart to that version, including hosts that reconnect later.",
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
              the right files, GPU, desktop, browser, OS, or hardware. They
              can persist, wake on demand, delegate work, and coordinate
              through mail and chat.
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
              close to the files, browsers, desktops, and hardware they need,
              while communication and history stay with the organization on the hub.
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
              hosts, updates, costs, variables, browser work, desktop control,
              model choice, and structured operations stay inspectable from the
              UI.
            </p>
          </div>

          <ScreenshotGallery />
        </div>
      </section>

      <section className="border-b border-slate-200" id="hackable">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 md:py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Hackable
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Fork it, change it, roll it across the cluster.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              NAISYS can run from your own fork. Build the behavior you want,
              commit it, then point the cluster at that version from the admin
              update screen.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {hackableSteps.map((step) => (
              <article
                className="rounded-md border border-slate-200 bg-white p-5"
                key={step.title}
              >
                <h3 className="font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </article>
            ))}
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
