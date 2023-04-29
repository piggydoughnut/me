import { BrowserRouter, Route, Routes } from "react-router-dom";

import Code from "pages/Code";
import CuratedList from "pages/CuratedList";
import Design from "pages/Design";
import Footer from "components/Footer";
import Main from "pages/Main";
import Navigation from "components/nav/Navigation";
import Plants from "pages/Plants";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-center font-firaSans text-midnight-black mx-8 md:mx-24 lg:mx-36 xl:mx-60">
        <Navigation />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/design" element={<Design />} />
          <Route path="/code" element={<Code />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/curated-list" element={<CuratedList />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
