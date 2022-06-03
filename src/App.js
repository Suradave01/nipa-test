import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Upload from "./routes/Upload";
import Webcam from "./routes/Appwebcam";
import Detect from "./routes/Detect";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Upload />}></Route>
          <Route path="/webcam" element={<Webcam />}></Route>
          <Route path="/detect" element={<Detect />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
