import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <Link to="/">Home</Link>

        <Link to="/posts">Posts</Link>

        <Link to="/form">Form</Link>
      </nav>
    </header>
  );
}
