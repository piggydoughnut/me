export default function Footer() {
  return (
    <section
      id="get_in_touch"
      className="mt-40 flex flex-col md:flex-row items-end"
    >
      <div>
        <h1 className="font-bold">
          Get in touch for collaboration <br />
          <span className="cursor-pointer hover:opacity-80 underline text-purple-link">
            hello@dariah.dev
          </span>
        </h1>
        <h3 className="mt-5">
          Also, in case you want to learn something new, here is a guide on{" "}
          <br />
          <a className="underline text-purple-link" href="./plants">
            How to create new plant species.
          </a>
        </h3>

        <p className="mt-5 sm:mt-40 mb-2 text-tiny">
          Coded and designed with ❤️ using TailwindCSS by me. All illustrations
          are mine too.
        </p>
      </div>
      <img alt="space lady" src="/lady.png" height="818" width="382" />
    </section>
  );
}
