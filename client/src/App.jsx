import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Pages from "./components/Pages";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Pages />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
