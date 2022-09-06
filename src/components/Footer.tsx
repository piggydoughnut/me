import Link from "./Link";

export default function Footer() {
  return (
    <section
      id="get_in_touch"
      className="mt-40 flex flex-col md:flex-row items-end"
    >
      <div>
        <h1 className="font-bold">
          Get in touch for collaboration <br />
          <Link link="mailto:hello@dariah.dev" linkName="hello@dariah.dev" />
        </h1>
        <h3 className="mt-5">
          Also, in case you want to learn something new, here is a guide. <br />
          <Link link="./plants" linkName="How to create new plant species" />
        </h3>

        <p className="mt-5 md:mt-40 mb-2 text-tiny">
          Coded and designed with ❤️ using TailwindCSS by me. All illustrations
          are mine too.
        </p>
      </div>
      <img
        className="w-64 md:w-96 self-center md:self-end"
        alt="space lady"
        src="/lady.webp"
        height="818"
        width="382"
      />
    </section>
  );
}
