type Props = {
  name: string;
  description: string;
  href: string;
  image: string;
  imageClassName?: string;
  imageWrapClassName?: string;
};

export default function PersonalProject({
  name,
  description,
  href,
  image,
  imageClassName = "w-8 h-8 sm:w-9 sm:h-9",
  imageWrapClassName = "bg-gray-50",
}: Props) {
  return (
    <a
      className="flex items-start gap-3 sm:gap-5 py-5 border-b border-gray-200 hover:text-purple-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-link"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span
        className={`flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden ${imageWrapClassName}`}
      >
        <img className={imageClassName} src={image} alt="" loading="lazy" />
      </span>
      <span className="min-w-0 max-w-xl">
        <span className="block font-bold text-base sm:text-sm leading-tight">
          {name}
        </span>
        <span className="block mt-1 text-small sm:text-base leading-relaxed text-gray-600">
          {description}
        </span>
      </span>
    </a>
  );
}
