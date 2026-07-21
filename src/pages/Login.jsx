import "./Login.css";

function Login() {

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;