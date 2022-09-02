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
      <div className="flex gap-8 flex-wrap basis-33 mt-20">
        <a
          className="hover:scale-110 ease-in-out duration-300"
          href="https://tokel.io"
        >
          <img
            className="h-auto w-[420px] border-2 rounded"
            alt="web"
            src="/designs/tokelweb2.png"
          />
        </a>
        <a className="hover:scale-110 ease-in-out duration-300" href="/">
          <img
            className="h-[290px] w-[420px] border-2 rounded"
            alt="web"
            src="/designs/web.png"
          />
        </a>
        <a
          className="hover:scale-110 ease-in-out duration-300"
          href="https://tokel.io/swap"
        >
          <img
            className="h-auto w-[420px] border-2 rounded"
            alt="web"
            src="/designs/swap.png"
          />
        </a>
        <a
          className="hover:scale-110 ease-in-out duration-300"
          href="https://chips.cash"
        >
          <img
            className="h-auto w-[420px] border-2 rounded"
            alt="web"
            src="/designs/chips.png"
          />
        </a>
      </div>
    </div>
  );
}
