export default function Design() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">Design</h1>
      <p className="w-4/5">
        I am fascinated by space and high contrasts however I am happy to design
        anything that is required and stick to the design guidelines and
        systems. <br /> <br />
        You can click on each design to see it live. I have designed them all
        using Figma.
      </p>
      <div className="flex gap-16 flex-col mt-20">
        <a className="" href="https://tokel.io">
          <img
            className="h-auto w-124 border-2 rounded"
            alt="web"
            src="/designs/tokelweb.png"
          />
        </a>
        <a className="" href="/">
          <img
            className="w-124 border-2 rounded"
            alt="web"
            src="/designs/web.png"
          />
        </a>
        <a className="" href="https://tokel.io/swap">
          <img
            className="h-auto  w-124 border-2 rounded"
            alt="web"
            src="/designs/swap.png"
          />
        </a>
        <a className="" href="https://chips.cash">
          <img
            className="h-auto  w-124 border-2 rounded"
            alt="web"
            src="/designs/chips.png"
          />
        </a>
      </div>
    </div>
  );
}
