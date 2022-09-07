import Link from "./Link";

export default function Main() {
  return (
    <div>
      <section className="mt-8 sm:mt-24 md:mt-40 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        <div className="flex">
          <img
            alt="daria"
            src="/face-lg.webp"
            srcSet={`face-sm.webp 300w, face-lg.webp 800w`}
            width="200"
            height="200"
            className="self-start"
          />
        </div>
        <div>
          <h1 className="font-bold leading-tight max-w-lg mb-3">
            Hello! My name is Daria and I write code
          </h1>
          <p className="space-y-2">
            I am a Senior Full Stack Engineer with 10 years of experience.{" "}
            <br />I mainly work with
            <a
              className="bg-yellow-200 hover:text-purple-link hover:underline p-1"
              href="/code"
            >
              Typescript, Reactjs and Nodejs
            </a>
            .
            <br />I love writting code for
            <a
              className="bg-yellow-200 hover:text-purple-link hover:underline p-1"
              href="/code#openSource"
            >
              open source
            </a>
            <br />
            Have been working remotely for the past 6 years. <br />
            Fiercly independent self sufficient creator. <br />
            Great communicator. <br />
            Have worked with
            <a
              className="bg-yellow-200 hover:text-purple-link hover:underline p-1"
              href="/code#blockchain"
            >
              blockchain
            </a>
            for the past 4 years.
            <br />
            I value communication, transparency, responsibility and compassion
            ❤️ above all.
            <br />
          </p>
          <div className="flex flex-row mt-5 gap-5">
            <h3 className="font-bold w-10">Code</h3>
            <svg
              className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0258 2C6.51676 2 2.05176 6.465 2.05176 11.974C2.05176 16.38 4.90876 20.119 8.87276 21.439C9.37176 21.529 9.55176 21.222 9.55176 20.958C9.55176 20.721 9.54376 20.093 9.54076 19.262C6.76576 19.864 6.17976 17.924 6.17976 17.924C5.72776 16.772 5.07276 16.465 5.07276 16.465C4.16776 15.846 5.14176 15.86 5.14176 15.86C6.14376 15.93 6.66876 16.888 6.66876 16.888C7.55876 18.412 9.00476 17.972 9.57076 17.717C9.66176 17.072 9.92176 16.632 10.2058 16.383C7.99176 16.132 5.66376 15.276 5.66376 11.453C5.66376 10.366 6.05276 9.474 6.68776 8.778C6.58676 8.525 6.24176 7.51 6.78676 6.138C6.78676 6.138 7.62376 5.869 9.52876 7.159C10.3268 6.938 11.1778 6.827 12.0248 6.823C12.8738 6.827 13.7258 6.938 14.5208 7.159C16.4268 5.868 17.2628 6.138 17.2628 6.138C17.8078 7.51 17.4658 8.525 17.3618 8.778C18.0018 9.474 18.3858 10.365 18.3858 11.453C18.3858 15.286 16.0558 16.128 13.8338 16.375C14.1888 16.683 14.5088 17.291 14.5088 18.221C14.5088 19.555 14.4968 20.631 14.4968 20.958C14.4968 21.225 14.6748 21.535 15.1838 21.437C19.1458 20.115 21.9998 16.379 21.9998 11.974C21.9998 6.465 17.5348 2 12.0258 2Z"
              />
            </svg>
          </div>
          {/* <div className="flex flex-row mt-3 gap-5">
            <h3 className="font-bold w-10">CV</h3>

            <svg
              className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 21H17V14.25C17 13.1914 15.8121 12.3058 14.7535 12.3058C13.6949 12.3058 13 13.1914 13 14.25V21H9.00001V9H13V11C13.6623 9.92857 15.3564 9.23727 16.525 9.23727C18.9965 9.23727 21 11.2786 21 13.75V21ZM7 21H3V9H7V21ZM5.00001 3C6.10458 3 7.00001 3.89543 7.00001 5C7.00001 6.10457 6.10458 7 5.00001 7C3.89544 7 3.00001 6.10457 3.00001 5C3.00001 3.89543 3.89544 3 5.00001 3Z" />
            </svg>
          </div> */}
          <div className="flex flex-row mt-3 gap-5">
            <h3 className="font-bold w-10">Other</h3>

            <svg
              className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.47936 2 2 6.47936 2 12C2 17.5206 6.47936 22 12 22C17.5099 22 22 17.5208 22 12C22 6.47922 17.5099 2 12 2ZM13.2489 8.5232C12.0921 6.42196 10.8514 4.66061 10.3687 3.99325C10.8926 3.89007 11.4384 3.83829 12 3.83829C14.0117 3.83829 15.8577 4.56889 17.2836 5.77585C16.9212 6.23032 15.6989 7.56779 13.2489 8.5232ZM11.2461 9.14209C7.90603 9.99802 4.94487 10.083 4.04692 10.0912C4.61822 7.7174 6.23488 5.74138 8.37644 4.67675C8.76767 5.21642 10.0278 7.01343 11.2461 9.14209ZM14.0743 10.1131C16.6374 9.02737 18.0135 7.57672 18.4747 7.02872C19.4803 8.33061 20.0969 9.94409 20.1663 11.6876C19.3988 11.5471 17.0565 11.1728 14.6631 11.4476C14.6493 11.414 14.6359 11.3802 14.6221 11.3453C14.5979 11.2845 14.5724 11.2202 14.5411 11.1471C14.3962 10.803 14.2363 10.452 14.0743 10.1131ZM3.81702 12.0106V11.9548C4.74682 11.9609 8.3688 11.898 12.1236 10.7986C12.3027 11.149 12.4709 11.5054 12.6327 11.8637C12.5941 11.8748 12.5554 11.8859 12.5179 11.8972L12.514 11.8985C8.60725 13.159 6.33316 16.3573 5.74256 17.275C4.54612 15.8558 3.81702 14.0137 3.81702 12.0106ZM16.8074 18.6068C16.6495 17.7579 16.2069 15.6608 15.307 13.1376C17.5091 12.8423 19.437 13.3066 20.0299 13.4771C19.6584 15.5753 18.4706 17.3968 16.8074 18.6068ZM7.11387 18.5583C7.49182 17.8659 9.22299 15.1039 13.3748 13.6118C14.4282 16.3827 14.8979 18.7205 15.0547 19.5891C14.108 19.9759 13.078 20.183 12 20.183C10.1683 20.183 8.47363 19.5784 7.11387 18.5583ZM13.5201 13.5591L13.5231 13.5577L13.5213 13.5587L13.5201 13.5591Z"
                className=""
              />
            </svg>

            <svg
              className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.625 8.063V3H15.375V8.063H8.625ZM15.375 10.875H21V21H3V10.875H8.625V15.938H15.375V10.875Z" />
            </svg>

            <svg
              className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.01 2.019C6.51504 2.019 2.01904 6.515 2.01904 12.01C2.01904 17.504 6.51504 22 12.01 22C17.504 22 22 17.504 22 12.01C22 6.515 17.554 2.019 12.01 2.019ZM16.605 16.455C16.406 16.754 16.056 16.855 15.755 16.656C13.406 15.206 10.459 14.906 6.96204 15.705C6.61404 15.807 6.31404 15.557 6.21404 15.256C6.11304 14.906 6.36304 14.608 6.66404 14.507C10.459 13.657 13.757 14.008 16.354 15.607C16.704 15.756 16.754 16.155 16.605 16.455ZM17.805 13.708C17.554 14.057 17.105 14.207 16.754 13.957C14.057 12.311 9.96204 11.809 6.81504 12.809C6.41704 12.91 5.96504 12.709 5.86604 12.311C5.76504 11.909 5.96604 11.459 6.36504 11.359C10.011 10.261 14.508 10.811 17.604 12.71C17.904 12.859 18.054 13.358 17.805 13.708ZM17.904 10.909C14.707 9.012 9.36204 8.812 6.31404 9.763C5.81504 9.911 5.31404 9.612 5.16604 9.163C5.01604 8.661 5.31404 8.162 5.76504 8.012C9.31204 6.963 15.157 7.162 18.854 9.363C19.303 9.612 19.453 10.212 19.203 10.661C18.953 11.011 18.354 11.159 17.904 10.909Z" />
            </svg>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <h2 className="font-bold">Latest project</h2>
        <p className="w-3/4 mt-5">
          <span className="font-bold">Tokel Platform</span> is an open source
          project which provides an easy and inexpensive tokenization solution.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-1 sm:gap-10">
          <h3 className="font-bold w-24">Role</h3>
          <p className="w-3/5">Tech Lead</p>
        </div>
        <div className="mt-3 flex flex-col sm:flex-row gap-1 sm:gap-10">
          <h3 className="font-bold w-24">What I did</h3>
          <p className="sm:w-3/5">
            I was the Tokel Tech Lead from project inception. I grew the team,
            interviewed and hired new team members. Together we created a fully
            decentralized open source tokenization solution. I provided
            necessary support, product management, team management,
            infrastructure planning, frontend development, blockchain
            development, new feature planning, task preparation, and interaction
            with the community. <br />
            <br />I worked closely with &nbsp;
            <Link link="https://komodoplatform.com/en/" linkName="the Komodo" />
            &nbsp; team on development of &nbsp;
            <Link
              link="https://github.com/tokelPlatform/nspv-js/"
              linkName="nspv-js library"
            />
            &nbsp; (SPV light node, allows quick and easy access without
            downloading the chain). That included working closely with raw
            Bitcoin transactions and Komodo blockchain specification.
          </p>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-1 sm:gap-10">
          <h3 className="font-bold w-24">Links</h3>
          <div className="flex gap-5">
            <a href="https://tokel.io">
              <svg
                className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.7073 15.5355L14.1215 16.9497L12.0002 19.0711C10.0475 21.0237 6.88171 21.0237 4.92909 19.0711C2.97647 17.1184 2.97647 13.9526 4.92909 12L7.05041 9.87867L8.46462 11.2929L6.3433 13.4142C5.17173 14.5858 5.17173 16.4853 6.3433 17.6568C7.51487 18.8284 9.41437 18.8284 10.5859 17.6568L12.7073 15.5355Z" />
                <path d="M11.293 8.46445L9.87884 7.05024L12.0002 4.92892C13.9528 2.9763 17.1186 2.9763 19.0712 4.92892C21.0238 6.88154 21.0238 10.0474 19.0712 12L16.9499 14.1213L15.5357 12.7071L17.657 10.5858C18.8286 9.4142 18.8286 7.51471 17.657 6.34313C16.4854 5.17156 14.5859 5.17156 13.4144 6.34313L11.293 8.46445Z" />
                <path d="M14.8286 7.75735L7.75752 14.8284L9.17173 16.2426L16.2428 9.17156L14.8286 7.75735Z" />
              </svg>
            </a>
            <a
              href="https://github.com/tokelPlatform/"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                className="cursor-pointer hover:scale-150 ease-in-out duration-300 fill-midnight-black hover:fill-purple-link"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0258 2C6.51676 2 2.05176 6.465 2.05176 11.974C2.05176 16.38 4.90876 20.119 8.87276 21.439C9.37176 21.529 9.55176 21.222 9.55176 20.958C9.55176 20.721 9.54376 20.093 9.54076 19.262C6.76576 19.864 6.17976 17.924 6.17976 17.924C5.72776 16.772 5.07276 16.465 5.07276 16.465C4.16776 15.846 5.14176 15.86 5.14176 15.86C6.14376 15.93 6.66876 16.888 6.66876 16.888C7.55876 18.412 9.00476 17.972 9.57076 17.717C9.66176 17.072 9.92176 16.632 10.2058 16.383C7.99176 16.132 5.66376 15.276 5.66376 11.453C5.66376 10.366 6.05276 9.474 6.68776 8.778C6.58676 8.525 6.24176 7.51 6.78676 6.138C6.78676 6.138 7.62376 5.869 9.52876 7.159C10.3268 6.938 11.1778 6.827 12.0248 6.823C12.8738 6.827 13.7258 6.938 14.5208 7.159C16.4268 5.868 17.2628 6.138 17.2628 6.138C17.8078 7.51 17.4658 8.525 17.3618 8.778C18.0018 9.474 18.3858 10.365 18.3858 11.453C18.3858 15.286 16.0558 16.128 13.8338 16.375C14.1888 16.683 14.5088 17.291 14.5088 18.221C14.5088 19.555 14.4968 20.631 14.4968 20.958C14.4968 21.225 14.6748 21.535 15.1838 21.437C19.1458 20.115 21.9998 16.379 21.9998 11.974C21.9998 6.465 17.5348 2 12.0258 2Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <a
          href="./Mikhailova_Daria.pdf"
          target="_blank"
          className="text-white font-bold mt-10 w-48 h-12 bg-black rounded-lg flex justify-center items-center"
        >
          CV
        </a>
      </section>

      <section className="mt-20">
        <h2 className="font-bold mb-5">About me</h2>

        <p>
          I have worked in the blockchain space mainly collaborating with people
          who are anonymous.
        </p>
        <br />

        <p>
          I am compassionate and a good communicator. It is natural for me to
          find common and comunicate with my teammates easily.
        </p>
        <br />

        <p>
          I have a Masters Degree in Computer Science which no one has ever
          asked me to show.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
