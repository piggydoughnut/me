import Link from "../Link";
import { useState } from "react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    className="text-lg sm:text-small hover:scale-110 ease-in-out duration-300 hover:text-purple-link fill-midnight-black"
    href={href}
  >
    {children}
  </a>
);

export default function Navigation() {
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between mt-5 ">
      <h3 className="text-xl sm:text-sm">
        <a href="/">Daria</a>
      </h3>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 mt-4 sm:m-0">
        <NavLink href="/code">Code</NavLink>
        <NavLink href="/design">Design</NavLink>
        <NavLink href="/plants">Make Plants</NavLink>
        <NavLink href="/curated-list">Curated</NavLink>
        <NavLink href="./Mikhailova_Daria.pdf">CV</NavLink>
      </div>
      <h3 className="mt-10 sm:m-0 flex flex-col justify-end text-right">
        <Link link="#get_in_touch">Get in touch</Link>
      </h3>
    </nav>
  );
}

// export default function Navigation() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="flex items-center justify-between flex-wrap  pt-6 sm:p-6">
//       <h3 className="text-md sm:text-sm flex-shrink-0">
//         <a href="/">Daria</a>
//       </h3>
//       <div className="block lg:hidden">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
//         >
//           <span className="sr-only">Open main menu</span>
//           <div
//             className={`relative w-6 h-6 transition-all ${
//               menuOpen ? "transform rotate-45" : "transform rotate-0"
//             }`}
//           >
//             <span
//               aria-hidden="true"
//               className="absolute w-full h-0.5 bg-current transform transition-all rounded-full"
//               style={{ top: "50%" }}
//             />
//             <span
//               aria-hidden="true"
//               className="absolute w-full h-0.5 bg-current transform transition-all rounded-full"
//               style={{ top: "50%" }}
//             />
//             <span
//               aria-hidden="true"
//               className={`absolute w-full h-0.5 bg-current transform transition-all rounded-full ${
//                 menuOpen ? "-rotate-45" : "rotate-0"
//               }`}
//               style={{ top: "50%" }}
//             />
//           </div>
//         </button>
//       </div>
//       <div
//         className={`w-full lg:flex lg:items-center lg:w-auto ${
//           menuOpen ? "block" : "hidden"
//         }`}
//       >
//         <div className="text-sm lg:flex-grow">
//           <a
//             href="#"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
//           >
//             Code
//           </a>
//           <a
//             href="#"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
//           >
//             Design
//           </a>
//           <a
//             href="#"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
//           >
//             Make plants
//           </a>
//           <a
//             href="#"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
//           >
//             Curated
//           </a>
//           <a
//             href="#"
//             className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
//           >
//             CV
//           </a>
//         </div>
//         <div>
//           <button
//             onClick={() => setMenuOpen(false)}
//             className="text-gray-500 hover:text-white lg:hidden"
//           >
//             <svg
//               className="h-6 w-6 fill-current"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 className="stroke-current stroke-2 stroke-linecap-round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }
