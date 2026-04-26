"use client";

import { KeyboardEvent, useState } from "react";

const diagramContent = {
  people: {
    title: "People",
    eyebrow: "Organization",
    body: "Users create agents, invite teammates, assign permissions, and decide which machines belong to the shared organization.",
    bullets: ["Users and permissions", "Human-managed agents", "Remote operators"],
  },
  supervisor: {
    title: "Supervisor",
    eyebrow: "Browser UI",
    body: "Supervisor is the control surface for agents, hosts, runs, costs, variables, models, and users.",
    bullets: ["Live run logs", "Agent and host management", "Cost and model controls"],
  },
  erp: {
    title: "ERP",
    eyebrow: "Structured work",
    body: "The optional ERP gives humans and agents a shared order and task system with operations, steps, fields, and assignments.",
    bullets: ["Orders and operations", "Agent-readable task state", "Blocked and completed work"],
  },
  hub: {
    title: "Hub",
    eyebrow: "State and routing",
    body: "The hub persists organizational state and routes work to hosts. Each host can run many agent/model pairs, and agents can be moved or pinned as the work requires.",
    bullets: ["Mail, logs, costs, and variables", "Host status and assignment", "Many agents per host"],
  },
  linuxHost: {
    title: "Linux GPU host",
    eyebrow: "Host example",
    body: "A Linux or GPU box can take shell-heavy work, code tasks, local model serving, and batch jobs that need the right files or hardware.",
    bullets: ["Shell and repo automation", "Local models or GPU jobs", "Pinned specialist agents"],
  },
  desktopHost: {
    title: "Desktop host",
    eyebrow: "Host example",
    body: "A Windows, macOS, or Linux desktop can run browser and GUI computer-use tasks that need a visible session.",
    bullets: ["Desktop screenshots and clicks", "Browser workflows", "OS-specific applications"],
  },
  vmHost: {
    title: "VM / CI host",
    eyebrow: "Host example",
    body: "A VM or CI machine can handle always-on background agents, test runners, review jobs, and other replaceable work.",
    bullets: ["Background workers", "Test and review loops", "Replaceable execution"],
  },
} as const;

type NodeId = keyof typeof diagramContent;
type HostNodeId = Extract<NodeId, "linuxHost" | "desktopHost" | "vmHost">;

const nodes: Array<{
  id: NodeId;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  caption: string;
}> = [
  {
    id: "people",
    x: 420,
    y: 56,
    width: 170,
    height: 60,
    label: "People",
    caption: "operate the org",
  },
  {
    id: "supervisor",
    x: 285,
    y: 154,
    width: 180,
    height: 68,
    label: "Supervisor",
    caption: "agents, hosts, runs",
  },
  {
    id: "erp",
    x: 555,
    y: 154,
    width: 180,
    height: 68,
    label: "ERP",
    caption: "orders and tasks",
  },
  {
    id: "hub",
    x: 420,
    y: 262,
    width: 230,
    height: 78,
    label: "Hub",
    caption: "state, routing, history",
  },
  {
    id: "linuxHost",
    x: 205,
    y: 386,
    width: 180,
    height: 76,
    label: "Linux GPU",
    caption: "local models, batch jobs",
  },
  {
    id: "desktopHost",
    x: 420,
    y: 386,
    width: 180,
    height: 76,
    label: "Desktop host",
    caption: "browser and GUI work",
  },
  {
    id: "vmHost",
    x: 635,
    y: 386,
    width: 180,
    height: 76,
    label: "VM / CI host",
    caption: "background workers",
  },
];

const connectors: Array<{
  from: NodeId;
  to: NodeId;
  path: string;
}> = [
  {
    from: "people",
    to: "supervisor",
    path: "M382 86 C352 108 318 116 292 121",
  },
  {
    from: "people",
    to: "erp",
    path: "M458 86 C488 108 522 116 548 121",
  },
  {
    from: "supervisor",
    to: "hub",
    path: "M326 188 C358 216 388 223 405 226",
  },
  {
    from: "erp",
    to: "hub",
    path: "M514 188 C482 216 452 223 435 226",
  },
  {
    from: "hub",
    to: "linuxHost",
    path: "M354 302 C306 324 252 336 214 348",
  },
  {
    from: "hub",
    to: "desktopHost",
    path: "M420 302 V348",
  },
  {
    from: "hub",
    to: "vmHost",
    path: "M486 302 C534 324 588 336 626 348",
  },
];

const agentModelPairs: Array<{
  host: HostNodeId;
  x: number;
  y: number;
  agent: string;
  model: string;
}> = [
  {
    host: "linuxHost",
    x: 150,
    y: 492,
    agent: "code agent",
    model: "Claude",
  },
  {
    host: "linuxHost",
    x: 260,
    y: 492,
    agent: "local agent",
    model: "Llama",
  },
  {
    host: "desktopHost",
    x: 365,
    y: 492,
    agent: "desktop agent",
    model: "OpenAI",
  },
  {
    host: "desktopHost",
    x: 475,
    y: 492,
    agent: "browser agent",
    model: "Gemini",
  },
  {
    host: "vmHost",
    x: 580,
    y: 492,
    agent: "worker",
    model: "Grok",
  },
  {
    host: "vmHost",
    x: 690,
    y: 492,
    agent: "reviewer",
    model: "OpenRouter",
  },
];

const hostCenters: Record<HostNodeId, number> = {
  linuxHost: 205,
  desktopHost: 420,
  vmHost: 635,
};

function DiagramNode({
  activeId,
  node,
  onSelect,
}: {
  activeId: NodeId;
  node: (typeof nodes)[number];
  onSelect: (id: NodeId) => void;
}) {
  const isActive = activeId === node.id;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(node.id);
    }
  };

  return (
    <g
      aria-label={`Show ${node.label}`}
      aria-pressed={isActive}
      className="cursor-pointer outline-none"
      onClick={() => onSelect(node.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <rect
        fill={isActive ? "#ccfbf1" : "#ffffff"}
        height={node.height}
        rx="8"
        stroke={isActive ? "#0f766e" : "#cbd5e1"}
        strokeWidth={isActive ? 2.5 : 1.4}
        width={node.width}
        x={node.x - node.width / 2}
        y={node.y - node.height / 2}
      />
      <text
        fill={isActive ? "#0f766e" : "#334155"}
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        x={node.x}
        y={node.y - 7}
      >
        {node.label}
      </text>
      <text
        fill="#64748b"
        fontSize="11"
        textAnchor="middle"
        x={node.x}
        y={node.y + 14}
      >
        {node.caption}
      </text>
    </g>
  );
}

function AgentModelPair({
  activeId,
  pair,
}: {
  activeId: NodeId;
  pair: (typeof agentModelPairs)[number];
}) {
  const isActive = activeId === pair.host;

  return (
    <g>
      <path
        d={`M${hostCenters[pair.host]} 424 V448 C${hostCenters[pair.host]} 460 ${pair.x} 456 ${pair.x} 470`}
        fill="none"
        stroke={isActive ? "#0f766e" : "#cbd5e1"}
        strokeLinecap="round"
        strokeWidth={isActive ? 2.3 : 1.5}
      />
      <rect
        fill={isActive ? "#f0fdfa" : "#f8fafc"}
        height="44"
        rx="7"
        stroke={isActive ? "#5eead4" : "#cbd5e1"}
        width="100"
        x={pair.x - 50}
        y={pair.y - 22}
      />
      <text
        fill="#334155"
        fontSize="11"
        fontWeight="700"
        textAnchor="middle"
        x={pair.x}
        y={pair.y - 4}
      >
        {pair.agent}
      </text>
      <text
        fill="#64748b"
        fontSize="10"
        textAnchor="middle"
        x={pair.x}
        y={pair.y + 13}
      >
        {pair.model}
      </text>
    </g>
  );
}

export function SystemDiagram() {
  const [activeId, setActiveId] = useState<NodeId>("hub");
  const active = diagramContent[activeId];

  return (
    <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
      <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-slate-200 bg-white p-3">
        <svg
          aria-label="NAISYS system map"
          className="h-auto w-[600px] max-w-none sm:w-full sm:min-w-[600px]"
          role="group"
          viewBox="0 0 690 535"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>NAISYS system map</title>
          <rect fill="#ffffff" height="535" width="690" />
          <g transform="translate(-70 0)">
            {connectors.map((connector) => {
              const isActive =
                connector.from === activeId ||
                connector.to === activeId ||
                (activeId === "hub" &&
                  (connector.to === "linuxHost" ||
                    connector.to === "desktopHost" ||
                    connector.to === "vmHost"));
              return (
                <path
                  d={connector.path}
                  fill="none"
                  key={`${connector.from}-${connector.to}`}
                  stroke={isActive ? "#0f766e" : "#cbd5e1"}
                  strokeLinecap="round"
                  strokeWidth={isActive ? 3 : 2}
                />
              );
            })}
          </g>
          <g transform="translate(-70 0)">
            {nodes.map((node) => (
              <DiagramNode
                activeId={activeId}
                key={node.id}
                node={node}
                onSelect={setActiveId}
              />
            ))}
          </g>
          <g transform="translate(-70 0)">
            {agentModelPairs.map((pair) => (
              <AgentModelPair
                activeId={activeId}
                key={`${pair.host}-${pair.agent}-${pair.model}`}
                pair={pair}
              />
            ))}
          </g>
        </svg>
      </div>

      <aside className="min-w-0 rounded-md border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase text-teal-700">
          {active.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">
          {active.title}
        </h3>
        <p className="mt-3 leading-7 text-slate-600">{active.body}</p>
        <ul className="mt-5 grid gap-2">
          {active.bullets.map((bullet) => (
            <li
              className="flex gap-2 text-sm leading-6 text-slate-600"
              key={bullet}
            >
              <i
                className="bi bi-check2 mt-0.5 text-teal-700"
                aria-hidden="true"
              ></i>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {nodes.map((node) => {
            const isActive = node.id === activeId;
            return (
              <button
                className={[
                  "rounded-md border px-3 py-2 text-left text-sm font-semibold transition",
                  isActive
                    ? "border-teal-700 bg-teal-50 text-teal-900"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:text-slate-950",
                ].join(" ")}
                key={node.id}
                onClick={() => setActiveId(node.id)}
                type="button"
              >
                {node.label}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
