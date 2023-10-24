import {BrowserRouter, Routes, Route} from "react-router-dom";
import Faq from "./Faq";
import Squares from "./Squares";
import Layout from "./Layout";
import Game from "./Game";
import Calculator from "./Calculator";

export default function Start() {

  return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="faq" element={<Faq />} />
                <Route path="game" element={<Game />} />
                <Route path="squares" element={<Squares />} />
                <Route path="calculator" element={<Calculator />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
  );
}
