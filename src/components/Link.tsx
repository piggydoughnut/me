type Props = {
  link: string;
  linkName: string;
};
export default function Link({ link, linkName }: Props) {
  return (
    <a
      className="underline text-purple-link hover:bg-yellow-200 pt-1 pb-1"
      href={link}
    >
      {linkName}
    </a>
  );
}
