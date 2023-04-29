import { ExternalLink } from "components/Link";

export default function CuratedList() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">
        Cool internet things
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-6 mt-20">
        <a
          href="http://web.archive.org/web/20221021070418/https://www.upfolio.com/ultimate-blockchain-guide"
          rel="noreferrer"
          target="_blank"
        >
          <img
            src="/curated/upfolio.png"
            alt="upfolio"
            width={370}
            className="border rounded"
          ></img>
        </a>

        <p>
          <ExternalLink link="http://web.archive.org/web/20221021070418/https://www.upfolio.com/ultimate-blockchain-guide">
            Ultimate Blockchain Guide
          </ExternalLink>{" "}
          <br />
          The coolest blockchain guide. <br />
          Clear and concise explanations with examples. <br />
          Unfortunately it has been discontinued, but we still have a capture by
          the Way Back Machine.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mt-20">
        <a
          href="https://www.erikdkennedy.com/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            src="/curated/erik.png"
            alt="upfolio"
            width={400}
            className="border rounded"
          ></img>
        </a>

        <p>
          <ExternalLink link="https://www.erikdkennedy.com/">
            Erik Kennedy
          </ExternalLink>{" "}
          <br />
          My absolute fav UI/UX designer out there.
          <br />
          He has two amazing courses which are practical and teach you all you
          need to know about UI/UX design.
          <br />
          <ExternalLink link="https://www.learnui.design/">
            Learn UI Design
          </ExternalLink>
          <br />
          <ExternalLink link="https://www.learnui.design/courses/learn-ux-design.html">
            Learn UX Design
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
