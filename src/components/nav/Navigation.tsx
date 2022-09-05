import Link from "../Link";

export default function Navigation() {
  return (
    <nav className="flex flex-col items-center sm:flex-row sm:justify-between mt-5 ">
      <h3 className="text-xl sm:text-sm">
        <a href="/">Daria</a>
      </h3>
      <div className="flex gap-12 sm:gap-8 mt-4 sm:m-0">
        <a
          className="text-lg sm:text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="/code"
        >
          Code
        </a>
        <a
          className="text-lg sm:text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="/design"
        >
          Design
        </a>
        <a
          className="text-lg sm:text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="./Mikhailova_Daria.pdf"
        >
          CV
        </a>
      </div>
      <h3 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
        <Link link="#get_in_touch" linkName="Get in touch" />
      </h3>
    </nav>
  );
}
