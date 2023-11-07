import { ExternalLink } from "components/Link";

const CuratedItem = ({
  url,
  imageUrl,
  title,
  description,
}: {
  url: string;
  imageUrl: string;
  title: string;
  description: string | Array<string | React.ReactNode>;
}) => {
  return (
    <div className="grid grid-rows-2 grid-cols-none sm:grid-rows-none sm:grid-cols-3 items-start gap-3">
      <a href={url} rel="noreferrer" target="_blank">
        <img
          src={imageUrl}
          alt="upfolio"
          width={370}
          className="border rounded"
        ></img>
      </a>

      <p className="col-span-2 self-start">
        <h2>
          <ExternalLink link={url}>{title}</ExternalLink>
        </h2>
        {description}
      </p>
    </div>
  );
};

export default function CuratedList() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3 mt-20">
        Skvělé věci na internetu
      </h1>
      <div className="flex flex-col gap-20 mt-10">
        {[
          {
            url: "http://web.archive.org/web/20221021070418/https://www.upfolio.com/ultimate-blockchain-guide",
            imageUrl: "/curated/upfolio.png",
            title: "Ultimátní průvodce blockchainem",
            description:
              "Nejúžasnější průvodce blockchainem. Jasné a stručné vysvětlení s příklady. Bohužel byl ukončen, ale stále máme kopii v archivu Way Back Machine.",
          },
          {
            url: "https://www.erikdkennedy.com/",
            imageUrl: "/curated/erik.png",
            title: "Erik Kennedy",
            description: [
              "Můj oblíbený designer pro UI/UX.",
              <br key="br1" />,
              "Má dvě úžasné kurzy, které jsou praktické a naučí vás vše, co potřebujete vědět o designu UI/UX.",
              <br key="br2" />,
              <ExternalLink key="link1" link="https://www.learnui.design/">
                Learn UI Design
              </ExternalLink>,
              <br key="br3" />,
              <ExternalLink
                key="link2"
                link="https://www.learnui.design/courses/learn-ux-design.html"
              >
                Learn UX Design
              </ExternalLink>,
            ],
          },
        ].map((item) => (
          <CuratedItem
            key={item.title}
            url={item.url}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
