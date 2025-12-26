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

const HeaderWrap = ({ children }: { children: React.ReactNode }) => (
  <nav className="flex flex-col sm:flex-row sm:justify-between mt-8 items-start">
    {children}
  </nav>
);

const LogoMenuWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row gap-10 items-start justify-start">
    {children}
  </div>
);

const Languages = () => (
  <h3 className="mt-0 flex gap-4 justify-end text-right">
    <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
      <Link link="/cz">CZ</Link>
    </h4>
    <h4 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
      <Link link="/">EN</Link>
    </h4>
  </h3>
);

const NavLinkWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:m-0">{children}</div>
);

export default function Navigation() {
  const location = useLocation();
  const isCzechPath =
    location.pathname.includes("/cz/") || location.pathname.includes("/cz");

  if (isCzechPath) {
    return (
      <HeaderWrap>
        <LogoMenuWrap>
          <a href="/">Daria</a>
          <NavLinkWrap>
            {[
              { href: "/cz/plants", children: "Jak se rodí květiny" },
              { href: "/cz/Mikhailova_Daria.pdf", children: "CV" },
              // { href: "/blog", children: "Blog" },
              { href: "/cz/#get_in_touch", children: "Kontaktujte mě" },
            ].map(({ href, children }) => (
              <NavLink href={href}>{children}</NavLink>
            ))}
          </NavLinkWrap>
        </LogoMenuWrap>
        <Languages />
      </HeaderWrap>
    );
  }
  return (
    <HeaderWrap>
      <LogoMenuWrap>
        <a className="text-sm" href="/">
          Daria
        </a>
        <NavLinkWrap>
          {[
            { href: "./Mikhailova_Daria.pdf", children: "CV" },
            { href: "/plants", children: "Art" },
            // { href: "/blog", children: "Blog" },
            { href: "/fun", children: "Fun" },
            { href: "/#get_in_touch", children: "Get in touch" },
          ].map(({ href, children }) => (
            <NavLink href={href}>{children}</NavLink>
          ))}
        </NavLinkWrap>
      </LogoMenuWrap>
      <Languages />
    </HeaderWrap>
  );
}
