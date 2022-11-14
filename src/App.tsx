import { BrowserRouter, Route, Routes } from "react-router-dom";

import Code from "./components/Code";
import Design from "./components/Design";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Navigation from "./components/nav/Navigation";
import Plants from "./components/Plants";

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
          {/* <Route path="/blockchain" element={<Blockchain />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
