export default function ProgrammingPlayCards() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">
        Cards for programmers
      </h1>

      <div className="flex flex-col gap-10">
        {[
          {
            title: "Code Whisperer",
            src: "/cards/Code-Whisperer-small.jpeg",
            downloadSrc: "/cards/Code-Whisperer.png",
            when: "Oh yeah! You have done it, you managed to separate a small task and fix it with a minimal amount of code, hence no headache for the reviewer. This card gives the code reviewer peace and serenity. They will also restore a bunch of health points in the process.",
          },
          {
            title: "Form Slayer",
            src: "/cards/Form-Slayer-small.jpeg",
            downloadSrc: "/cards/Form-Slayer.png",
            when: "Imagine you have just conquered some beurocratic process - filled out a bunch of forms, wrote an essay about how amazing you are, or whatever else is required of you at work. Now its time to share the joy with the rest of your team.",
          },
          {
            title: "Pull Requestus Gigantus",
            src: "/cards/PR-gigantus-small.jpeg",
            downloadSrc: "/cards/PR-gigantus.png",
            when: "Play this one when you produced such a massive PR that it is a bit awkward to ask others to review it. All you can offer to them in that moment is a bit of fun in exchange for hours of their pain trying to claw their way through a wall of code that you have created.",
          },
        ].map((c) => {
          return (
            <Card
              downloadSrc={c.downloadSrc}
              key={c.title}
              title={c.title}
              src={c.src}
              when={c.when}
            />
          );
        })}
      </div>
    </div>
  );
}



const Card = ({
  title,
  src,
  downloadSrc,
  when,
}: {
  title: string;
  src: string;
  downloadSrc: string; 
  when: string;
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadSrc; // replace with your actual image src variable
    const fileName = downloadSrc.split("/").pop() || "card.png";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="space-y-6 md:grid md:grid-cols-3">
      <div className="max-w-[400px]">
        <img width="300px" src={src} alt={src}></img>
      </div>
      <div className="md:ml-10 col-span-2 flex flex-col gap-4">
        <h2>{title}</h2>
        <div>
          <b>When to play</b>
          <div> {when}</div>
        </div>
        <button
          onClick={handleDownload}
          className="w-fit mt-2 px-4 py-2 bg-black hover:bg-pink-600 text-white font-semibold rounded shadow transition-colors duration-200"
        >
          Download card
        </button>
      </div>
    </div>
  );
};