import Link from "components/Link";

export default function Art() {
  return (
    <div className="mt-40 flex flex-col gap-2">
      <h1 className="font-bold leading-tight max-w-md mb-3">
       Art
      </h1>
      <div>
        <Link link="/plants">Learn how the plants are born</Link>
      </div>
      <div>
        <Link link="/cards">
         Cards for programmers
        </Link>
      </div>
    </div>
  );
}
