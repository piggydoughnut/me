type Props = {
  title: string;
  link: string;
  aboutProject?: string;
  role: string;
  desc: string;
  image: string;
};
export default function Project({
  title,
  link,
  aboutProject,
  role,
  desc,
  image,
}: Props) {
  return (
    <div className="bg-indigo-50 p-8 flex flex-row gap-4 mb-8">
      <img className="h-auto w-[400px]" src={image} alt={image}></img>

      <div>
        <a href={link}>
          <h2 className="font-bold">{title}</h2>
        </a>
        {aboutProject && <p className="text-small">{aboutProject}</p>}
        <p className="font-bold text-small mt-8">{role}</p>
        <p className="text-small">{desc}</p>
      </div>
    </div>
  );
}
