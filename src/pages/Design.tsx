export default function Design() {
  return (
    <div className="mt-40">
      <h1 className="font-bold leading-tight max-w-md mb-3">Design</h1>
      <p className="w-4/5">
        I am fascinated by space and high contrasts. <br /> <br />
        You can click on each design to see it live. They are all created in
        Figma.
      </p>
      <div className="flex gap-16 flex-col mt-20">
        {[
          {
            image: "/designs/tokelweb",
            url: "https://tokel.io",
            projectName: "Tokel website",
            overview:
              "Tokel is an innovative open-source blockchain project with a primary focus on simplifying the creation of tokens and NFTs. It offers a user-friendly and cost-effective tokenization solution.",
            problem:
              "The existing Tokel website lacked consistency and failed to establish sufficient trust with users. Insufficient information about the project made it challenging to capture users' interest effectively.",
            solution: [
              "To address these issues, we embarked on a redesign journey for the Tokel website, aligning closely with established brand guidelines and design systems. The revamped website aims to showcase the blockchain's functionality comprehensively and elucidate the possibilities it offers to users.",
              <br />,
              <br />,
              "The overarching objective is to enhance brand perception by delivering a polished and professional representation of the Tokel brand. The visual theme of the website draws inspiration from space, reflecting Tokel's position as a vast galaxy of token projects and NFTs.",
            ],
            myRole: [
              "I contributed as both designer and developer, refining visual aspects and integrating feedback from the team. The illustrations, created by another designer, enhanced the final product.",
            ],
          },
          {
            image: "/designs/swap",
            url: "https://tokel.io.swap",
            projectName: "Tokel swap page",
            overview:
              "The swap page serves as a gateway for users to support the project by exchanging TOKEL for their preferred currency. ",
            problem:
              "Purchasing TOKEL presents challenges due to its small size and low liquidity, leading to limited exchange listings. Existing platforms that do list TOKEL often lack user-friendly interfaces. Simplifying the process of acquiring TOKEL and facilitating its dissemination became paramount.",
            solution: [
              "To address these challenges, we developed a straightforward swap page allowing users to swiftly acquire TOKEL using well-established cryptocurrencies. Emphasizing ease of use, the page provides clear warnings against potential errors and elucidates the swapping process, managing user expectations effectively. Integrated within existing designs, the swap page adheres closely to brand guidelines and utilizes predefined elements and components.",
            ],
            myRole: "Designer and developer.",
          },
          {
            image: "/designs/chips",
            url: "https://chips.cash",
            projectName: "CHIPS website",
            overview:
              "CHIPS is a blockchain, a direct fork of BTC, serving as the cryptocurrency for the first fully decentralized poker game powered by the Pangea Protocol. ",
            problem:
              "The CHIPS website suffered from inconsistency, relying on WordPress—a platform susceptible to bulkiness and vulnerabilities. Furthermore, it failed to effectively communicate CHIPS' purpose and capabilities to visitors.",
            solution:
              "To address these issues, it was decided to redesign CHIPS website. Leveraging pre-existing hand-drawn graphics by a community member. I infused the site with a thematic blend of casino games, sunrise motifs, gaming chips, neon lights, and the ambiance of a midnight city.",
            myRole:
              "I was both designer and developer on this project. Iterating through multiple design versions, I collaborated closely with the open-source CHIPS community, incorporating continuous feedback. After finalizing the approved design, I implemented it, ensuring the website effectively communicates CHIPS' identity and offerings.",
          },
        ].map((item, idx) => (
          <div key={idx}>
            <h2 className="font-bold mb-8">{item.projectName}</h2>
            <a className="" href={item.url}>
              <img
                className="border rounded"
                src={`${item.image}-md.webpp`}
                srcSet={`${item.image}-sm.webp 300w, ${item.image}-md.webp 800w, ${item.image}-lg.webp 1080w`}
                alt={item.projectName}
              />
            </a>

            <h3 className="font-bold mt-8">Overview</h3>
            <p className="w-4/5">{item.overview}</p>
            <h3 className="font-bold mt-4">Problem</h3>
            <p className="w-4/5">{item.problem}</p>
            <h3 className="font-bold mt-4">Solution</h3>
            <p className="w-4/5">{item.solution}</p>
            <h3 className="font-bold mt-4">My role</h3>
            <p className="w-4/5 mb-12"> {item.myRole}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
