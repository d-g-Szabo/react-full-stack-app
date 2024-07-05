import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <Link to="/">
          <div className="button">Home</div>
        </Link>

        <Link to="/posts">
          <div className="button">Posts</div>
        </Link>

        <Link to="/form">
          <div className="button">Add new post</div>
        </Link>
      </nav>
    </header>
  );
}
