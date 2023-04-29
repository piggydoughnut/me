import Project from "../components/Project";

const projects = [
  // {
  //   title: "Personal website",
  //   link: "/",
  //   projectId: "openSource",
  //   aboutProject: "My personal piece of internet where I show off my skills.",
  //   role: "Designer and Developer",
  //   desc: "I have been working on this one mentally for a long time but only recently had a moment to sit down and create it. I drafted designs in Figma and took this opportunity to try out Tail Wind CSS that everyone has been talking about. I must say it is very fun to work with. When I have a chance to make a side project I like to experiment with new libraries and technologies.",
  //   image: "/projects/web.png",
  //   tags: ["reactj", "tailwindcss", "typescript"],
  //   openSource: true,
  // },
  {
    title: "Tech Lead for Tokel",
    link: "https://github.com/TokelPlatform/tokel_dapp/releases",
    projectId: "blockchain",
    aboutProject:
      "an open source project which provides an easy and inexpensive tokenization solution.",
    role: "Technical Lead",
    desc: "I was the Tokel tech lead from project inception. I grew the team, interviewed and hired new team members. Together we created a fully decentralized open source tokenization solution. I provided necessary support, product management, team management, infrastructure planning, frontend development, blockchain development, new feature planning, task preparation, and interaction with the community. ",
    image: "/projects/tokeldapp.webp",
    tags: ["electron", "typescript", "blockchain", "nspv", "rematch"],
    openSource: true,
  },
  {
    title: "Developer for nSPV-js",
    link: "https://github.com/tokelPlatform/nspv-js/",
    aboutProject:
      "Nspv-js is a lite node which allows full secure communication with blockchain without having to download the whole chain.",
    role: "Developer",
    desc: "I worked closely with Komodo team on development of nspv-js library. My main goal was to improve the usage of the library by making the output easier to consume for developers. I participated in implementation and decisions on how to extend and improve the library and what functionality it could benefit from. I worked primarily with raw bitcoin data and various cryptography libraries.",
    image: "/projects/nspv.webp",
    tags: ["btc standard", "blockchain", "javascript", "bitcoinjs-lib"],
    openSource: true,
  },
  {
    title: "Developer for Tokel website",
    link: "https://tokel.io",
    role: "Designer and Developer",
    desc: "I have designed and created Tokel website using GatsbyJs. The main goal was to explain in a concise manner what Tokel Blockchain is and what it offers. ",
    image: "/projects/tokelweb.webp",
    tags: ["gatsbyjs", "emotion css", "formik"],
    openSource: true,
  },
  {
    title: "Frontend developer for CHIPS",
    link: "https://chips.cash",
    aboutProject:
      "CHIPS is a cryptocurrency used to play the first truly decentralized poker game powered by the Pangea Protocol. CHIPS is its own blockchain, pure fork of BTC.",
    role: "Frontend Developer",
    desc: "I worked on the frontend, did product management, community outreach, helped dockerize the project setup to reduce complexity, created throrough documentation. The project was at a stale phase when I joined. I turned it around and revived it by active contribution, communication with community and frequent development updates.",
    image: "/projects/poker.webp",
    tags: ["electron", "redux", "react", "blockchain"],
    openSource: true,
  },
  {
    title: "Lead Backend Enginner for PredictionVC",
    link: "https://tokel.io",
    aboutProject:
      "PredictionVC was an educational space for users where they could learn about cryptocurrency, blockchain, track their wallets, complete tasks and receive rewards. ",
    role: "Lead Backend Engineer",
    desc: "I was responsible for the backend infrastructure and implementation of the PredictionVC Platform. I also worked on organizing and collecting cryptocurrency historical data.",
    image: "/projects/predictionvc.webp",
    tags: ["nodejs", "reactjs", "api"],
    openSource: false,
  },
];
export default function Code() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">Code</h1>
      <p>Projects that I have worked on in the past 4 years.</p>
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
          tags={p.tags}
          openSource={p.openSource}
          projectId={p.projectId}
        />
      ))}
    </div>
  );
}
