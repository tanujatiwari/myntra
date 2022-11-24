import React, { useEffect } from "react";
import loginImg from "./images/loginSignUp.webp";

function LoginSignup() {
  useEffect(() => {
    // document.getElementById("#footer").style.opacity = "0";
  }, []);
  return (
    <div>
    <div className="backdrop" id="backdrop">.</div>
      <div
        className="justify-content-center align-items-center d-flex"
        style={{ height: "100vh", background: "#ffc0cb8c" }}
      >
        <div className="bg-white" style={{ width: "fit-content" }}>
          <img src={loginImg} className="img-fluid w-100" />
          <div className="p-5">
            <div style={{ fontSize: "24px" }}>
              <b>Login</b> or <b>Signup</b>
            </div>
            <form>
              <input type="tel" className="form-control shadow-none" />
              <label>
                By continuing, I agree to the <a href="">Terms of Use</a> &{" "}
                <a href="">Privacy Policy</a>
              </label>
              <div
                className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
                style={{ background: "rgb(255, 63, 108)" }}
              >
                <b>CONTINUE</b>
              </div>
              <div>Have trouble logging in? <span className="text-danger">Get help</span></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
