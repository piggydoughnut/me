import Link, { ExternalLink, FunLink } from "components/Link";

import Icons from "components/Icons";
import PersonalProject from "components/PersonalProject";

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
        </p>
      </section>
      <section className="mt-10">
        <h2 className="font-bold">Osobní projekty</h2>
        <div className="mt-6 max-w-2xl">
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500">
            Produkty
          </h3>
          <PersonalProject
            name="heyclock"
            description="Z existujících výkazů práce připraví srozumitelné přehledy o dodržování pravidel pracovní doby a pošle je e-mailem."
            href="https://heyclock.io/"
            image="/projects/heyclock.svg"
            imageWrapClassName="bg-gray-100"
          />
          <PersonalProject
            name="Shadowcat Labs"
            description="Sleduje na Telegramu úniky přihlašovacích údajů, hlášení o průnicích a zneužití značek a předává strukturovaná upozornění bezpečnostním platformám."
            href="https://shadowcatlabs.com/"
            image="/projects/shadowcat-labs.jpg"
            imageClassName="w-full h-full object-cover"
            imageWrapClassName="bg-gray-100"
          />
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500 mt-8">
            Pro radost
          </h3>
          <PersonalProject
            name="Hack Your Cycle"
            description="Malý nástroj, který přidá fáze cyklu do Kalendáře Google, aby se plány mohly přizpůsobit tvému rytmu."
            href="https://hack-your-cycle.com/"
            image="/projects/hack-your-cycle.png"
            imageClassName="w-10 h-10 sm:w-12 sm:h-12"
            imageWrapClassName="bg-pink-50"
          />
          <PersonalProject
            name="Virtual Postcards"
            description="Pocta ranému internetu: vyber si nostalgickou virtuální pohlednici a pošli ji někomu blízkému."
            href="https://postcardru.com/"
            image="/projects/virtual-postcards.svg"
            imageClassName="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            imageWrapClassName="bg-yellow-100"
          />
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500 mt-8">
            Umění
          </h3>
          <PersonalProject
            name="Sad Sunday Club"
            description="Ručně kreslené ilustrace, myšlenky a občasné malé dopisy o životě."
            href="https://sadsundayclub.com/"
            image="/projects/sad-sunday-club.jpeg"
            imageClassName="w-full h-full object-cover"
            imageWrapClassName="bg-gray-100"
          />
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
