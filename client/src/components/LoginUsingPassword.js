import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

function LoginUsingPassword() {
    const history = useHistory();
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
  }, []);

  const setupAcc = () => {
    document.getElementById("setupProfile").style.display = "block";
    document.getElementById("toLogin").style.display = "none";
    history.push("/");
  };
  return (
    <section id="loginUsingPassword">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex">
        <div
          id="mobileView"
          className="bg-white mx-lg-3 mx-md-3 mx-sm-3 p-4 pt-5"
          style={{ width: "400px", height: "70vh" }}
        >
          <div className="p-3 position-relative">
            <div
              style={{ fontWeight: "700", fontSize: "20px", color: "#424553" }}
            >
              Login to your account
            </div>
            <form action="/">
              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Email or Mobile Number"
                style={{ height: "40px" }}
              />
              <input
                className="form-control shadow-none mt-3 rounded-0"
                type="password"
                placeholder="Password"
                style={{ height: "40px" }}
              />
              <button
                type="submit"
                className="btn btn-danger border-0 w-100 rounded-0 my-4 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
                onClick={setupAcc}
              >
                LOGIN
              </button>
            </form>
            <div style={{ fontSize: "12px" }}>
              Forget your password?&nbsp;
              <NavLink to="/forgot" className="text-decoration-none">
                {" "}
                <span
                  style={{
                    color: "#FF3C6F",
                    fontWeight: "600",
                  }}
                >
                  Reset here
                </span>
              </NavLink>
            </div>
            <div className="mt-4" style={{ fontSize: "12px" }}>
              Having trouble logging in?&nbsp;
              <span
                style={{
                  color: "#FF3C6F",
                  fontWeight: "600",
                }}
              >
                Get help
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginUsingPassword;
