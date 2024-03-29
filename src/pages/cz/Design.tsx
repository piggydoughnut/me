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
            image: "/designs/web",
            url: "/",
            projectName: "Personal website",
            overview:
              "This is a space where I show off my work and introduce myself to the world.",
            problem:
              "I needed a good presentation of my skills to share with potential employers. I wanted people to know who I am and reach out to me for collaboration. It is also a space for my creativity where I can try out new coding frameworks, effects and animations.",
            solution:
              "Create a website for myself using TailWind CSS which I have been really curious about. To add personality and show my creative side I added my own illustrations.",
            myRole:
              "Designer, Illustrator, programmer and copywrighter. I have created my designs in Figma and implemented them with React, TailwindCSS and Typescript.",
          },
          {
            image: "/designs/tokelweb",
            url: "https://tokel.io",
            projectName: "Tokel website",
            overview:
              "Tokel is an open source blockchain project. It’s main goal is to make creating tokens and NFTs easy. It provides an easy to use and inexpensive tokenization solution.",
            problem:
              "Current Tokel website was inconsistent and did not create enough trust with users. It was hard to get users interested in Tokel because there was not enough information about the project.",
            solution: [
              "Re-design Tokel website, following the brand guidelines and design system which has formed throughout previous design process.  The new website has to show off the functionality of the blockchain and explain what can be done with the Tokel Blockchain.",
              <br />,
              <br />,
              "The main goals is to improve brand perception, by creating high quality brand representation.",
              <br />,
              <br />,
              "Visual theme of the website is space. Tokel is a galaxy of token projects and NFTs. ",
            ],
            myRole: [
              "Designer and programmer.  I have iterated through several version of designs, have received feedback from the team and gradually imlemented it.",
              <br />,
              "I followed brand guidelines and used illustartions created by another designer on the team.",
            ],
          },
          {
            image: "/designs/swap",
            url: "https://tokel.io.swap",
            projectName: "Tokel swap page",
            overview:
              "The swap page allows users to support the project by swapping TOKEL for the currency of their choice. ",
            problem:
              "It is difficult to buy Tokel since the project is small and it has low liquidity. Hence not many exchnages are interested in listing Tokel. The ones that list Tokel are not easy to use. We wanted to make it easier for the interested people to obtain Tokel and to share it with others.",
            solution: [
              "Create a simple swap page through which users can quickly obtain Tokel using well known and accepted crypto currencies. The page has to be very easy to use and warn users of possible mistakes. The page has to clearly state what the process of swapping means and set users’ expectations accordingly.",
              <br />,

              "Swap page was added to the already created designs, so it had to follow the brand guidelines and make use of already defined elements and components created in the previous design.",
            ],
            myRole: "Designer and programmer. ",
          },
          {
            image: "/designs/chips",
            url: "https://chips.cash",
            projectName: "CHIPS website",
            overview:
              "CHIPS is a blockchain, pure fork of BTC. CHIPS is a cryptocurrency used to play the first truly decentralized poker game powered by the Pangea Protocol. ",
            problem:
              "CHIPS website was inconsistent, created on Wordpress (bulky and vulnerable) and did not clearly communicate what CHIPS was or what it could do.",
            solution:
              "Re-design CHIPS website. I decided to re-use the already created graphics which were hand drawn by one of the community members. CHIPS website’s theme is casino games, sunrise, game chips, neon lights, midnight city. All those elements are integrated in designs through vector graphics, background images, neon borders and colour choices. ",
            myRole:
              "Designer and programmer. I have worked through several iterations of designs, getting constant open source CHIPS community feedback and eventually implemented the approved version.",
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
