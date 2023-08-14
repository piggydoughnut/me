import Link from "../Link";

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
      </div>
      <h3 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
        <Link link="#get_in_touch">Get in touch</Link>
      </h3>
    </nav>
  );
}
