import "./Login.css";

function Register() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;