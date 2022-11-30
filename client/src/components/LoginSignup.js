import React, { useEffect } from "react";
import loginImg from "./images/loginSignUp.webp";

function LoginSignup() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
    // document.getElementById("loginProfileIcon").style.display = "none";
  }, []);

  return (
    <section id="login">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div
        className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex"
      >
        <div
        id="mobileView"
          className="bg-white mx-3"
          style={{ width: "400px", height: "70vh" }}
        >
          <img src={loginImg} className="img-fluid w-100" />
          <div className="p-3">
            <div style={{ fontSize: "16px", color: "#535766" }}>
              <b style={{ color: "#424553", fontSize: "20px" }}>Login</b> or{" "}
              <b style={{ color: "#424553", fontSize: "20px" }}>Signup</b>
            </div>
            <form action="/otpLogin" className="position-relative mt-4">
              <div className="align-items-center d-flex">
                <div
                  className="pl-2"
                  style={{
                    zIndex: "1",
                    color: "#808080d4",
                    position: "absolute",
                  }}
                >
                  +91 |{" "}
                </div>
                <input
                  className="form-control shadow-none rounded-0 w-100"
                  type="tel"
                  placeholder="Mobile Number"
                  pattern="[0-9]{10}"
                  style={{ height: "40px", paddingLeft: "54px" }}
                />
              </div>
              <label
                className="my-3"
                style={{ fontSize: "13px", color: "rgba(40,44,63,.8)" }}
              >
                By continuing, I agree to the{" "}
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Terms of Use
                </a>{" "}
                &{" "}
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Privacy Policy
                </a>
              </label>
              <button
                type="submit"
                className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
              >
                CONTINUE
              </button>
              <div
                className="mt-4"
                style={{ color: "rgba(40,44,63,.8)", fontSize: "13px" }}
              >
                Have trouble logging in?{" "}
                <span
                  className=""
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Get help
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSignup;
