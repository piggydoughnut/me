import { BrowserRouter, Route, Routes } from "react-router-dom";

import Code from "pages/Code";
import CuratedList from "pages/CuratedList";
import CuratedListCZ from "pages/cz/CuratedList";
import Design from "pages/Design";
import Footer from "components/Footer";
import Main from "pages/Main";
import MainCZ from "pages/cz/Main";
import Navigation from "components/nav/Navigation";
import Plants from "pages/Plants";
import PlantsCZ from "pages/cz/Plants";
import ProgrammingPlayCards from "pages/ProgrammingPlayCards";
import Art from "pages/Art";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-center font-firaSans text-midnight-black mx-10 lg:mx-10 xl:mx-[16.5rem] transition-all duration-300">
        <Navigation />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/design" element={<Design />} />
          <Route path="/code" element={<Code />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/art" element={<Art />} />
          <Route path="/cards" element={<ProgrammingPlayCards />} />
          <Route path="/curated-list" element={<CuratedList />} />
          <Route path="/cz" element={<MainCZ />} />
          <Route path="/cz/plants" element={<PlantsCZ />} />
          <Route path="/cz/curated-list" element={<CuratedListCZ />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
