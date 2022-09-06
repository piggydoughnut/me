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
  projectId?: string;
};
export default function Project({
  title,
  projectId,
  link,
  aboutProject,
  role,
  desc,
  image,
  tags,
  openSource,
}: Props) {
  return (
    <div
      id={projectId ? projectId : title}
      className="bg-indigo-50 p-8 flex flex-col sm:flex-row gap-12 mb-0 sm:mb-8 rounded"
    >
      <img
        className="w-[232px] w:[146.86px] sm:h-[235.48px] sm:w-96"
        src={image}
        alt={image}
      ></img>

      <div>
        <div className="flex flex-col-reverse sm:flex-row justify-between">
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
        {/* <p className="font-bold text-small mt-8">{role}</p> */}
        <p className="mt-8 font-bold">My responsibilities</p>
        <p className="text-small">{desc}</p>
        {tags && (
          <div className="flex flex-row gap-4 mt-4 flex-wrap">
            {tags.map((t) => (
              <Label key={t} text={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
