import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavLink = ({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) => (
  <a
    className={`flex min-h-11 items-center text-base sm:text-small hover:text-purple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-link ${
      active ? "text-purple-link underline underline-offset-4" : ""
    }`}
    href={href}
    aria-current={active ? "page" : undefined}
  >
    {children}
  </a>
);

const Languages = ({ isCzechPath }: { isCzechPath: boolean }) => (
  <div
    className="col-start-2 row-start-1 flex items-center gap-4 sm:ml-auto"
    role="group"
    aria-label={isCzechPath ? "Jazyk" : "Language"}
  >
    {[
      { code: "CZ", name: "Czech", href: "/cz", lang: "cs", current: isCzechPath },
      { code: "EN", name: "English", href: "/", lang: "en", current: !isCzechPath },
    ].map(({ code, name, href, lang, current }) =>
      current ? (
        <span
          key={code}
          className="flex min-h-11 min-w-11 items-center justify-center text-small text-gray-500"
          lang={lang}
          aria-label={`${name} (current language)`}
        >
          {code}
        </span>
      ) : (
        <a
          key={code}
          className="flex min-h-11 min-w-11 items-center justify-center text-small text-purple-link underline hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-link"
          href={href}
          lang={lang}
          aria-label={name}
        >
          {code}
        </a>
      )
    )}
  </div>
);

export default function Navigation() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isCzechPath = pathname === "/cz" || pathname.startsWith("/cz/");
  const links = isCzechPath
    ? [
        { href: "/cz/plants", label: "Jak se rodí květiny" },
        { href: "/cz/Mikhailova_Daria.pdf", label: "CV" },
        { href: "/cz/#get_in_touch", label: "Kontaktujte mě" },
      ]
    : [
        { href: "/Mikhailova_Daria.pdf", label: "CV" },
        { href: "/plants", label: "Art" },
        { href: "/#get_in_touch", label: "Get in touch" },
        { href: "/fun", label: "Happy New Year 🎄" },
      ];

  return (
    <nav
      aria-label={isCzechPath ? "Hlavní navigace" : "Main navigation"}
      className="mt-8 grid grid-cols-[1fr_auto_auto] gap-x-2 gap-y-3 sm:flex sm:items-start"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsMenuOpen(false);
      }}
    >
      <a
        className="col-start-1 row-start-1 flex min-h-11 min-w-11 items-center text-sm hover:text-purple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-link"
        href={isCzechPath ? "/cz" : "/"}
        aria-current={pathname === (isCzechPath ? "/cz" : "/") ? "page" : undefined}
      >
        Daria
      </a>
      <div
        id="site-menu"
        className={`col-span-3 row-start-2 grid overflow-hidden transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none sm:ml-10 sm:flex sm:overflow-visible sm:opacity-100 sm:visible sm:transition-none ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible"
        }`}
      >
        <div className="min-h-0 overflow-hidden sm:overflow-visible">
          <div
            className={`flex flex-col bg-lime-yellow/80 px-4 py-2 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none sm:flex-row sm:gap-4 sm:bg-transparent sm:p-0 sm:transform-none ${
              isMenuOpen ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            {links.map(({ href, label }) => (
              <NavLink key={href} href={href} active={pathname === href}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <Languages isCzechPath={isCzechPath} />
      <button
        type="button"
        className="col-start-3 row-start-1 flex h-11 w-11 items-center justify-center text-midnight-black hover:text-purple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-link sm:hidden"
        aria-controls="site-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? (isCzechPath ? "Zavřít nabídku" : "Close menu") : (isCzechPath ? "Otevřít nabídku" : "Open menu")}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </nav>
  );
}
