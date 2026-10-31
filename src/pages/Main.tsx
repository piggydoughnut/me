import Link, { ExternalLink, FunLink } from "../components/Link";

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
        <div className="mt-6 max-w-2xl">
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500">
            Products
          </h3>
          <PersonalProject
            name="heyclock"
            description="Turns existing timesheets into clear working-time compliance reports, delivered straight to your inbox."
            href="https://heyclock.io/"
            image="/projects/heyclock.svg"
            imageWrapClassName="bg-gray-100"
          />
          <PersonalProject
            name="Shadowcat Labs"
            description="Monitors Telegram for leaked credentials, breach claims and brand abuse, then delivers structured alerts to security platforms."
            href="https://shadowcatlabs.com/"
            image="/projects/shadowcat-labs.png"
            imageClassName="w-8 h-8 object-contain"
            imageWrapClassName="bg-gray-100"
          />
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500 mt-8">
            For fun
          </h3>
          <PersonalProject
            name="Hack Your Cycle"
            description="A little tool that adds cycle phases to Google Calendar, so your schedule can move with you."
            href="https://hack-your-cycle.com/"
            image="/projects/hack-your-cycle.png"
            imageClassName="w-10 h-10 sm:w-12 sm:h-12"
            imageWrapClassName="bg-pink-50"
          />
          <PersonalProject
            name="Virtual Postcards"
            description="A love letter to the early internet: pick a delightfully retro postcard and send it to someone."
            href="https://postcardru.com/"
            image="/projects/virtual-postcards.svg"
            imageClassName="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            imageWrapClassName="bg-yellow-100"
          />
          <h3 className="font-bold text-small uppercase tracking-wider text-gray-500 mt-8">
            Art
          </h3>
          <PersonalProject
            name="Sad Sunday Club"
            description="Hand-drawn illustrations, thoughts and occasional little letters about life."
            href="https://sadsundayclub.com/"
            image="/projects/sad-sunday-club.jpeg"
            imageClassName="w-full h-full object-cover"
            imageWrapClassName="bg-gray-100"
          />
        </div>
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
