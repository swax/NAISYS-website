"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const screenshots = [
  {
    src: "/screenshots/supervisor-run-log.png",
    capability: "Watch the work happen",
    title: "Run log",
    body: "Inspect live consoles, command output, model turns, screenshots, duration, host, model, and cost for each run.",
    width: 2159,
    height: 1318,
  },
  {
    src: "/screenshots/supervisor-agent-details.png",
    capability: "Manage agents together",
    title: "Agent detail",
    body: "Start, stop, disable, archive, assign hosts, set lead agents, and inspect prompts and configuration.",
    width: 2159,
    height: 1329,
  },
  {
    src: "/screenshots/supervisor-host-details.png",
    capability: "Pool different machines",
    title: "Host detail",
    body: "See connected machines, host capabilities, status, and where work can run across the cluster.",
    width: 2153,
    height: 1326,
  },
  {
    src: "/screenshots/supervisor-update.png",
    capability: "Update the cluster",
    title: "Supervisor update",
    body: "Roll every host to an npm version or fork commit; offline hosts apply the selected version when they reconnect.",
    width: 2301,
    height: 1455,
  },
  {
    src: "/screenshots/supervisor-cost-tracking.png",
    capability: "Control spend",
    title: "Cost tracking",
    body: "Review spend limits, recent totals, rolling time buckets, and cost by agent.",
    width: 2158,
    height: 1316,
  },
  {
    src: "/screenshots/supervisor-computer-use.png",
    capability: "Give agents real tools",
    title: "Computer use",
    body: "Follow desktop-control runs with screenshots, focused regions, key actions, and console output.",
    width: 2160,
    height: 1320,
  },
  {
    src: "/screenshots/supervisor-headless-browser.png",
    capability: "Automate browser work",
    title: "Headless browser",
    body: "Inspect browser-driven runs with page state, screenshots, and selector-based actions.",
    width: 2158,
    height: 1394,
  },
  {
    src: "/screenshots/supervisor-chat-thread.png",
    capability: "Coordinate agents",
    title: "Chat and mail",
    body: "Coordinate with agents through shorter chat threads and persistent inter-agent messaging.",
    width: 2158,
    height: 1318,
  },
  {
    src: "/screenshots/supervisor-variables.png",
    capability: "Persist shared state",
    title: "Variables",
    body: "Manage shared values and sensitive configuration without burying state in prompts.",
    width: 2164,
    height: 1323,
  },
  {
    src: "/screenshots/supervisor-model-comparison.png",
    capability: "Use any model stack",
    title: "Models",
    body: "Compare configured model backends and keep model choice visible to operators.",
    width: 2144,
    height: 1326,
  },
  {
    src: "/screenshots/erp-order-operation.png",
    capability: "Coordinate operational work",
    title: "ERP operations",
    body: "Track orders, operations, steps, assignments, fields, and completed work in a structured workflow.",
    width: 2166,
    height: 1315,
  },
];

type Screenshot = (typeof screenshots)[number];

function ScreenshotFigure({
  index,
  isFeatured = false,
  screenshot,
  setActiveIndex,
}: {
  index: number;
  isFeatured?: boolean;
  screenshot: Screenshot;
  setActiveIndex: (index: number) => void;
}) {
  return (
    <figure className="max-w-full rounded-md border border-slate-200 bg-white p-3">
      <button
        aria-label={`Open ${screenshot.title} screenshot`}
        className="block w-full max-w-full cursor-zoom-in rounded-md text-left"
        onClick={() => setActiveIndex(index)}
        type="button"
      >
        <Image
          alt={`${screenshot.title} screenshot`}
          className="h-auto w-full rounded-md border border-slate-200"
          height={screenshot.height}
          sizes={
            isFeatured
              ? "(min-width: 1152px) 1088px, calc(100vw - 40px)"
              : "(min-width: 768px) 528px, calc(100vw - 40px)"
          }
          src={screenshot.src}
          width={screenshot.width}
        />
      </button>
      <figcaption
        className={
          isFeatured
            ? "grid gap-1 px-1 pt-3 sm:grid-cols-[0.3fr_0.7fr] sm:gap-4"
            : "pt-3"
        }
      >
        {isFeatured ? (
          <>
            <span>
              <span className="block text-sm font-semibold uppercase text-teal-700">
                {screenshot.capability}
              </span>
              <span className="mt-1 block font-semibold text-slate-950">
                {screenshot.title}
              </span>
            </span>
            <span className="text-sm leading-6 text-slate-600">
              {screenshot.body}
            </span>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase text-teal-700">
              {screenshot.capability}
            </p>
            <h3 className="font-semibold text-slate-950">
              {screenshot.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {screenshot.body}
            </p>
          </>
        )}
      </figcaption>
    </figure>
  );
}

export function ScreenshotGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeScreenshot =
    activeIndex === null ? null : screenshots[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;

  const close = () => setActiveIndex(null);
  const showPrevious = () =>
    setActiveIndex((current) =>
      current === null
        ? current
        : (current - 1 + screenshots.length) % screenshots.length,
    );
  const showNext = () =>
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % screenshots.length,
    );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="mt-6">
        <ScreenshotFigure
          index={0}
          isFeatured
          screenshot={screenshots[0]}
          setActiveIndex={setActiveIndex}
        />
      </div>

      <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
        {screenshots.slice(1).map((screenshot, index) => (
          <ScreenshotFigure
            index={index + 1}
            key={screenshot.src}
            screenshot={screenshot}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>

      {activeScreenshot && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/45 p-3 backdrop-blur-[1px] sm:p-5"
          onClick={close}
          role="dialog"
        >
          <div
            className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase text-teal-700">
                  {activeScreenshot.capability}
                </p>
                <p className="truncate font-semibold text-slate-950">
                  {activeScreenshot.title}
                </p>
                <p className="text-sm text-slate-500">
                  {activePosition} of {screenshots.length}
                </p>
              </div>
              <button
                aria-label="Close screenshot"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-xl text-slate-700 hover:border-slate-400 hover:text-slate-950"
                onClick={close}
                type="button"
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 bg-slate-100 p-3">
              <button
                aria-label="Previous screenshot"
                className="hidden h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-xl text-slate-700 hover:border-slate-400 hover:text-slate-950 sm:inline-flex"
                onClick={showPrevious}
                type="button"
              >
                <i className="bi bi-chevron-left" aria-hidden="true"></i>
              </button>

              <div className="min-h-0 overflow-auto rounded-md border border-slate-200 bg-white p-2">
                <Image
                  alt={`${activeScreenshot.title} screenshot`}
                  className="mx-auto h-auto max-h-[calc(100vh-12rem)] w-auto max-w-full rounded"
                  height={activeScreenshot.height}
                  priority
                  src={activeScreenshot.src}
                  width={activeScreenshot.width}
                />
              </div>

              <button
                aria-label="Next screenshot"
                className="hidden h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-xl text-slate-700 hover:border-slate-400 hover:text-slate-950 sm:inline-flex"
                onClick={showNext}
                type="button"
              >
                <i className="bi bi-chevron-right" aria-hidden="true"></i>
              </button>
            </div>

            <div className="grid gap-2 border-t border-slate-200 px-4 py-3 sm:grid-cols-[auto_auto_1fr] sm:items-center">
              <div className="flex gap-2 sm:hidden">
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
                  onClick={showPrevious}
                  type="button"
                >
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                  Previous
                </button>
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
                  onClick={showNext}
                  type="button"
                >
                  Next
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 no-underline hover:border-slate-400 hover:text-slate-950"
                href={activeScreenshot.src}
                target="_blank"
              >
                <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                Open original
              </a>
              <p className="text-sm leading-6 text-slate-600">
                {activeScreenshot.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
