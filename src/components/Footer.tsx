import Link from "./Link";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isCzechPath =
    location.pathname.includes("/cz/") || location.pathname.includes("/cz");

  if (isCzechPath) {
    return (
      <section
        id="get_in_touch"
        className="mt-40 flex flex-col md:flex-row items-end"
      >
        <div>
          <h1 className="font-bold">
            Kontaktujte mě pro spolupráci na adrese <br />
            <Link link="mailto:hello@dariah.dev">hello@dariah.dev</Link>
          </h1>
          <h3 className="mt-5">
            A pokud máte zájem o nové znalosti, zde je průvodce: <br />
            <Link link="./cz/plants">Jak vytvořit nový druh rostliny</Link>
          </h3>
          <p className="mt-5 md:mt-40 mb-2 text-tiny">
            "Vytvořeno a navrženo s ❤️ za použití TailwindCSS mnou. Všechny
            ilustrace jsou také moje.
          </p>
        </div>
        <img
          className="w-64 md:w-96 self-center md:self-end"
          alt="space lady"
          src="/lady.webp"
          height="818"
          width="382"
        />
      </section>
    );
  }
  return (
    <section
      id="get_in_touch"
      className="mt-40 flex flex-col md:flex-row items-end"
    >
      <div>
        <h1 className="font-bold">
          Get in touch for collaboration <br />
          <Link link="mailto:hello@dariah.dev">hello@dariah.dev</Link>
        </h1>
        <h3 className="mt-5">
          Also, in case you want to learn something new, here is a guide. <br />
          <Link link="./plants">How to create new plant species</Link>
        </h3>

        <p className="mt-5 md:mt-40 mb-2 text-tiny">
          Coded and designed with ❤️ using TailwindCSS by me. All illustrations
          are mine too.
        </p>
      </div>
      <img
        className="w-64 md:w-96 self-center md:self-end"
        alt="space lady"
        src="/lady.webp"
        height="818"
        width="382"
      />
    </section>
  );
}
