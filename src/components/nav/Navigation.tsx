export default function Navigation() {
  return (
    <nav className="flex flex-row justify-between mt-5">
      <h3>
        <a href="/">Daria</a>
      </h3>
      <div className="flex gap-8">
        <a
          className="text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="/code"
        >
          Code
        </a>
        <a
          className="text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="/design"
        >
          Design
        </a>
        <a
          className="text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="/blockchain"
        >
          Blockchain
        </a>
        <a
          className="text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
          href="./Mikhailova_Daria.pdf"
        >
          Curriculum Vitae
        </a>
      </div>
      <h3 className="flex flex-col justify-end text-right">
        <a
          className="ease-in-out duration-300 hover:text-purple-link"
          href="#get_in_touch"
        >
          Get in touch
        </a>
      </h3>
    </nav>
  );
}
