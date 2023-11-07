import { useEffect, useState } from "react";

import Link from "../Link";
import { useLocation } from "react-router-dom";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    className="text-lg sm:text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
    href={href}
  >
    {children}
  </a>
);

export default function Navigation() {
  const location = useLocation();
  const isCzechPath =
    location.pathname.includes("/cz/") || location.pathname.includes("/cz");

  if (isCzechPath) {
    return (
      <nav className="flex flex-col sm:flex-row sm:justify-between mt-5 ">
        <h3 className="text-xl sm:text-sm">
          <a href="/">Daria</a>
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 mt-4 sm:m-0">
          <NavLink href="/cz/plants">Jak se rodí květiny</NavLink>
          <NavLink href="/cz/curated-list">Pečlivě vybrané</NavLink>
          <NavLink href="./Mikhailova_Daria.pdf">CV</NavLink>
          <NavLink href="/cz/#get_in_touch">Kontaktujte mě</NavLink>
        </div>
        <h3 className="mt-10 sm:m-0 flex gap-4 justify-end text-right">
          <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
            <Link link="/cz">CZ</Link>
          </h4>
          <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
            <Link link="/">EN</Link>
          </h4>
        </h3>
      </nav>
    );
  }
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between mt-5 ">
      <h3 className="text-xl sm:text-sm">
        <a href="/">Daria</a>
      </h3>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 mt-4 sm:m-0">
        {/* <NavLink href="/code">Work</NavLink> */}
        {/* <NavLink href="/code">Pet projects</NavLink> */}
        {/* <NavLink href="/design">Design</NavLink> */}
        <NavLink href="/plants">Make Plants</NavLink>
        <NavLink href="/curated-list">Curated</NavLink>
        <NavLink href="./Mikhailova_Daria.pdf">CV</NavLink>
        <NavLink href="/cz/#get_in_touch">Get in touch</NavLink>
      </div>
      <h3 className="mt-10 sm:m-0 flex gap-4 justify-end text-right">
        <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
          <Link link="/cz">CZ</Link>
        </h4>
        <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
          <Link link="/">EN</Link>
        </h4>
      </h3>
    </nav>
  );
}
