import Link, { ExternalLink, FunLink } from "components/Link";

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
        </div>
        <div>
          <h1 className="font-bold leading-tight max-w-lg mb-3">
            Ahoj! Jsem Daria.
          </h1>
          <p className="mt-1">Softwarová inženýrka</p>
          <p className="space-y-2">
            <br />
            <p className="text-gray-500 text-small">Moje zájmy: </p>
            <FunLink
              href="https://github.com/piggydoughnut/"
              color={FunLinkColors.yellow}
            >
              Open Source
            </FunLink>
            <br />
            Remote/Asynchronní práce <br />
            Kybernetická bezpečnost
            <br />
            Design
            <br />
            <FunLink
              color={FunLinkColors.yellow}
              href="https://dribbble.com/daria-draws"
            >
              Illustrace
            </FunLink>
            <br />
            Blockchain
            <br />
            <br />
            <p className="">
              <span className="text-gray-500 text-small"> Oceňuji:</span>
              <br />
              komunikaci, transparentnost, zodpovědnost a soucit ❤️ především.
            </p>
          </p>
          <div className="flex flex-row items-center mt-3 gap-5">
            <ExternalLink link={"https://github.com/piggydoughnut"}>
              {Icons.github}
            </ExternalLink>
            <ExternalLink link={"https://dribbble.com/daria-draws"}>
              {Icons.dribbble}
            </ExternalLink>
            <ExternalLink link={"https://instagram.com/sogoodnotsogood/"}>
              {Icons.instagram}
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
        <h2 className="font-bold">V současné době</h2>
        <p className="w-3/4 mt-5">
          Spolupracuji s různými klienty, např.{" "}
          <Link link="https://parity.io">Parity</Link> a 2A design. <br />
          Osobní projekty:{" "}
          <ExternalLink link="https://hack-your-cycle.com/">
            Hack Your Cycle
          </ExternalLink>
          ,{" "}
          <ExternalLink link="https://postcardru.com/">
            Virtual Postcards
          </ExternalLink>
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
