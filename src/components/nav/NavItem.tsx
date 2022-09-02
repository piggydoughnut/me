type NavItemProps = {
  link: string;
  name: string;
};

export default function NavItem({ link, name }: NavItemProps) {
  return (
    <a
      className="text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
      href={`/${link}`}
    >
      {name}
    </a>
  );
}
