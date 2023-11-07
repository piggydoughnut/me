type Props = {
  link: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Link({ link, onClick, children }: Props) {
  return (
    <a
      onClick={onClick}
      className="underline text-purple-link hover:bg-yellow-200 pt-1 pb-1"
      href={link}
    >
      {children}
    </a>
  );
}

export const ExternalLink = ({ link, children }: Props) => (
  <a
    className="underline text-purple-link hover:bg-yellow-200 pt-1 pb-1"
    href={link}
    rel="noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

export const FunLink = ({
  color,
  children,
  href,
}: {
  color: string;
  children: React.ReactNode;
  href?: string;
}) => (
  <a
    className={`${color} hover:text-purple-link hover:underline p-1`}
    href={href}
  >
    {children}
  </a>
);
