import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="tophalf">
        <section className="hero">
          <h1>NAISYS</h1>
          <Image
            src="/NAISYS-website/naisys_logo.png"
            alt="NAISYS Logo"
            width="150"
            height="150"
            priority
          />

          <h4>Node.js Autonomous Intelligence System</h4>
        </section>

        <section className="links">
          <h4>
            <a href="https://www.npmjs.com/package/naisys">
              <i className="bi bi-boxes"></i> NPM
            </a>
          </h4>
          <div className="sep"> | </div>
          <h4>
            <a href="https://github.com/swax/NAISYS">
              <i className="bi bi-github"></i> GitHub
            </a>
          </h4>
          <div className="sep"> | </div>
          <h4>
            <a href="https://discord.gg/JBUPWSbaEt">
              <i className="bi bi-discord"></i> Discord
            </a>
          </h4>
          <div className="sep"> | </div>
          <h4>
            <a href="https://www.youtube.com/watch?v=Ttya3ixjumo">
              <i className="bi bi-youtube"></i> Demo Video
            </a>
          </h4>
        </section>
      </div>

      <section className="bottomhalf max-width-section">
        NAISYS provides a thin layer between LLM(s) and the command shell. It
        provides the scaffolding for autonomous operation and commands for
        inter-agent communication.
        <br />
        <br />
        Here is a{" "}
        <a
          href="https://test.naisys.org/archives/24-03-06-alice-fan-site-gpt-claude/"
          target="_blank"
        >
          sample website
        </a>{" "}
        that was built with NAISYS by an AI dev and admin agent. Here are the{" "}
        <a
          href="https://test.naisys.org/archives/24-03-06-alice-fan-site-gpt-claude/logs/jason-log.html"
          target="_blank"
        >
          logs
        </a>{" "}
        of the process, and a{" "}
        <a href="https://www.youtube.com/watch?v=Ttya3ixjumo" target="_blank">
          video
        </a>{" "}
        of it being built in real time.
        <br />
        <br />
        Use <div className="code">npm install -g naisys</div> on Linux or Windows/WSL to
        start building your own mutli-agent command line automations. See the{" "}
        <a href="https://www.npmjs.com/package/naisys">NPM page</a> for how to
        configure.
        <br />
        <br />
        NAISYS is a MIT licensed{" "}
        <a href="https://github.com/swax/NAISYS">open source</a> project.
        We&apos;d love to hear your results and feedback on what models give you
        good results. We&apos;re also interested in ideas of how to fine tune
        models for better console interactions. Come say, &ldquo;Hi 👋&rdquo; in
        the <a href="https://discord.gg/JBUPWSbaEt">Discord</a>!
      </section>
    </>
  );
}
