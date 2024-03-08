import fs from "fs";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import path from "path";

const links = [
  {
    href: "https://www.npmjs.com/package/naisys",
    text: "NPM",
    icon: "bi-boxes",
  },
  {
    href: "https://github.com/swax/NAISYS",
    text: "GitHub",
    icon: "bi-github",
  },
  {
    href: "https://discord.gg/JBUPWSbaEt",
    text: "Discord",
    icon: "bi-discord",
  },
  {
    href: "https://www.youtube.com/watch?v=Ttya3ixjumo",
    text: "Demo Video",
    icon: "bi-youtube",
  },
];

export default function Home() {
  const mainPageContent = fs
    .readFileSync(path.join("articles", `homepage.md`))
    .toString();

  return (
    <>
      {/* Top blue page header */}
      <section
        className="bg-blue-900 text-white p-2.5 text-center"
        style={{ backgroundColor: "#00001c" }}
      >
        <h1 className="font-bold mt-1 text-4xl">NAISYS</h1>

        <Image
          alt="NAISYS Logo"
          className="logo mt-4 mx-auto w-36"
          priority
          src="/naisys_logo.png"
          width="150"
          height="150"
        />

        <h4 className=" mt-4 text-xl">
          Node.js Autonomous Intelligence System
        </h4>

        <div className="flex justify-center mt-4 pb-2 space-x-5">
          {links.map((link, index) => (
            <div key={index}>
              <a
                className="font-bold hover:text-white hover:underline no-underline text-white"
                href={link.href}
              >
                <i className={`bi ${link.icon}`}></i> {link.text}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section
        className={[
          "max-w-3xl",
          "mx-auto",
          "p-5",
          "text-black",
          "prose",
          "prose-lg",
          "prose-neutral",
          "prose-a:font-normal",
          "prose-a:hover:text-blue-800",
          "prose-a:text-blue-800",
          "prose-a:underline",
        ].join(" ")}
      >
        <div className=""></div>
        <Markdown>{mainPageContent}</Markdown>
      </section>
    </>
  );
}
