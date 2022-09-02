import Project from "./Project";

const projects = [
  {
    title: "The website you are on",
    link: "/",
    aboutProject:
      "representation of my skills and also an opportunity to try out TailWindCss that everyone is talking about. ",
    role: "Designer and Developer",
    desc: "At first I only wanted to make a simple no framework static website which I have started with. After a while as I decided to add more sections and many more repeating components I quickly ported my vanilla TailWindCss project to a Typescript React Js project. From MVP and through iteration of improvement here it is for you to enjoy.",
    image: "/projects/web.png",
    tags: ["reactj", "tailwindcss", "typescript"],
  },
  {
    title: "Tokel Platform",
    link: "https://github.com/TokelPlatform/tokel_dapp/releases",
    aboutProject:
      "an open source project which provides an easy and inexpensive tokenization solution.",
    role: "Technical Lead",
    desc: "I worked with both designs and frontened development of the platform and Tokel's website. I did product management and took part in deciding where the platform is moving and what new features are going to be implemented. I planned work load for others and provided necessary support. ",
    image: "/projects/tokeldapp2.png",
  },
  {
    title: "nSPV-js",
    link: "github.com/tokelPlatform/nspv-js/",
    aboutProject:
      "lite node which allows full secure communication with blockchain without having to download the whole chain.",
    role: "Developer",
    desc: "I worked closely with Komodo team on development of nspv-js library. My main goal was to parse and present blockchain data in an easy to consume format so development using nspv will become possible in the future. I worked a lot with raw bitcoin data and various cryptography libraries.",
    image: "/projects/nspv.png",
  },
  {
    title: "Tokel website",
    link: "https://tokel.io",
    role: "Designer and Developer",
    desc: "I have designed and created Tokel website using GatsbyJs. The main goal was to explain in a concise manner what Tokel Blockchain is and what it offers. The website had to repsent the chain functionality and be on brand. Tokel is a universe of projects and tokens and the website is supposed to reflect that.",
    image: "/projects/tokelweb.png",
  },
  {
    title: "CHIPS Pangea",
    link: "https://chips.cash",
    aboutProject:
      "Purely decentralized open source poker game, part of the Komodo ecosystem.",
    role: "Frontend Developer",
    desc: "I worked on the frontend, did product management, community outreach, helped dockerize the project setup to reduce complexity, created throrough documentation. The project was at a stale phase when I joined. I turned it around and revived it by active contribution, communication with community and frequent development updates.",
    image: "/projects/poker.png",
  },
  {
    title: "PredictionVC",
    link: "https://tokel.io",
    aboutProject:
      "an open source project which provides an easy and inexpensive tokenization solution.",
    role: "Lead Backend Engineer",
    desc: "I was responsible for the backend infrastructure and implementation of the PredictionVC Platform. The platform was meant to serve as an educational space for users to learn about cryptocurrency, track their wallets, complete tasks and receive rewards.",
    image: "/projects/predictionvc.png",
  },
];
export default function Code() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">Code</h1>
      <p>Projects that I have worked on recently in the past 4 years.</p>
      <div className="mt-20"></div>
      {projects.map((p) => (
        <Project
          key={p.title}
          title={p.title}
          link={p.link}
          aboutProject={p.aboutProject}
          role={p.role}
          desc={p.desc}
          image={p.image}
        />
      ))}
    </div>
  );
}
