import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Impact from "./pages/Impact";
import About from "./pages/About";
import Donate from "./pages/Donate";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
