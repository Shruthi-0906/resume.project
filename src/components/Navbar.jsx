import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        AI Interview Prep
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Features</li>
        <li>Login</li>
        <li>Register</li>
      </ul>
    </nav>
  );
}

export default Navbar;