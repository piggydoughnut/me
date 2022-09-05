import Label from "./Label";

type Props = {
  title: string;
  link: string;
  aboutProject?: string;
  role: string;
  desc: string;
  image: string;
  tags?: Array<string> | undefined;
  openSource?: boolean;
};
export default function Project({
  title,
  link,
  aboutProject,
  role,
  desc,
  image,
  tags,
  openSource,
}: Props) {
  return (
    <div className="bg-indigo-50 p-8 flex flex-row gap-12 mb-8 rounded">
      <div className="hover:scale-110 ease-in-out duration-200 border-blue-900">
        <a className="" href={link}>
          <img className="" src={image} alt={image}></img>
        </a>
      </div>

      <div>
        <div className="flex flex-row justify-between">
          <a className="underline" href={link}>
            <h2 className="font-bold">{title}</h2>
          </a>
          {openSource && (
            <div className="bg-lime-yellow pl-1 pr-1 pt-0.5 pb-0.5 text-small self-baseline mt-1.5">
              OPEN SOURCE
            </div>
          )}
        </div>
        {aboutProject && <p className="text-small">{aboutProject}</p>}
        <p className="font-bold text-small mt-8">{role}</p>
        <p className="text-small">{desc}</p>
        {tags && (
          <div className="flex flex-row gap-4 mt-4">
            {tags.map((t) => (
              <Label text={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
