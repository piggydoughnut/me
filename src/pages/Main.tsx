import Link, { ExternalLink, FunLink } from "../components/Link";

import Icons from "components/Icons";

const FunLinkColors = {
  pink: "bg-pink-200",
  yellow: "bg-yellow-200",
};

export default function Main() {
  return (
    <div>
      <section className="mt-8 sm:mt-24 md:mt-40 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        <div className="flex flex-col">
          <img alt="daria" src="/me-surf.JPG" className="self-start" />
          <p className="text-gray-400 mt-2 text-right text-small">
            This is "Madness", she is not with us anymore after being snapped 3
            times.
          </p>
        </div>
        <div>
          <h1 className="font-bold leading-tight max-w-lg mb-3">
            Hello! I am Daria
          </h1>
          <p className="mt-1">Software Engineer</p>
          <p className="space-y-2">
            <br />
            <p className="text-gray-500 text-small">I am into: </p>
            <FunLink
              href="https://github.com/piggydoughnut/"
              color={FunLinkColors.yellow}
            >
              Open Source
            </FunLink>
            <br />
            Remote/Async Work <br />
            Cyber Security
            <br />
            <FunLink color={FunLinkColors.yellow} href="/design">
              Design
            </FunLink>
            <br />
            <FunLink
              color={FunLinkColors.yellow}
              href="https://dribbble.com/daria-draws"
            >
              Illustration
            </FunLink>
            <br />
            Blockchain
            <br />
            <br />
            <p className="">
              <span className="text-gray-500 text-small">I value:</span>
              <br />
              communication, transparency, responsibility and compassion ❤️
              above all.
            </p>
          </p>
          <div className="flex flex-row items-center mt-3 gap-5">
            <ExternalLink link={"https://github.com/piggydoughnut"}>
              {Icons.github}
            </ExternalLink>
            <ExternalLink link={"https://dribbble.com/daria-draws"}>
              {Icons.dribbble}
            </ExternalLink>
            <ExternalLink link={"https://open.spotify.com/user/11120726331"}>
              {Icons.spotify}
            </ExternalLink>{" "}
            <ExternalLink
              link={"https://www.linkedin.com/in/daria-mikhailova/"}
            >
              {Icons.linkedin}
            </ExternalLink>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <h2 className="font-bold">Currently</h2>
        <p className="w-3/4 mt-5">
          <br />- Collaborating with various clients, such as{" "}
          <Link link="https://parity.io">Parity Technologies</Link>, 2A design
          and others. <br />
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-bold">Personal projects</h2>
        <p className="w-3/4 mt-5">
          <ExternalLink link="https://hack-your-cycle.com/">
            Hack Your Cycle
          </ExternalLink>{" "}
          - simple tool for women to sync their cycle phases with Google
          Calendar. <br />
          <ExternalLink link="https://postcardru.com/">
            Virtual Postcards
          </ExternalLink>{" "}
          - an exact copy of the 90s virtual postcard website.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-bold">Certifications</h2>
        <a href="https://www.credly.com/badges/1d8c0b9e-0bab-4346-87cd-693a374d7ec8/public_url">
          <img
            src="./sec-plus.png"
            alt="sec+ badge id: 1d8c0b9e-0bab-4346-87cd-693a374d7ec8"
            width="100"
            height="100"
          ></img>
        </a>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
