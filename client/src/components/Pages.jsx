import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Form from "../pages/Form";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}
