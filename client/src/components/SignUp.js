import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  window.scroll(0, 0);
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
    // document.getElementById("loginProfileIcon").style.display = "none";
  }, []);
  const setupAcc = () => {
    document.getElementById("setupProfile").style.display = "block";
    document.getElementById("toLogin").style.display = "none";
    history.push("/");
  };
  return (
    <section id="signup">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div
        className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex"
      >
        <div
        id="mobileView"
          className="bg-white p-3 mx-lg-3 mx-md-3 mx-sm-3"
          style={{ height: "fit-content", width: "500px" }}
        >
          <div className="mb-3" style={{ fontWeight: "600", fontSize: "18px" }}>
            Complete your sign up
          </div>
          <form action="/">
            <div>
              <div className="d-flex align-items-center">
                <div style={{ color: "grey" }}>Mobile Number</div>
                <div className="fa fa-check-circle text-success ml-auto"></div>
              </div>
              <div>xxxxxxxxxxx</div>
              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Create Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                style={{ height: "40px" }}
              />
              <div className="row gx-0">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    8 Characters
                  </div>
                </div>
                <div className="col-lg-3 px-lg-2 px-md-2 pl-sm-2 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Special
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Uppercase
                  </div>
                </div>
                <div className="col-lg-3 pl-lg-2 pl-md-2 pl-sm-2 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Numeric
                  </div>
                </div>
              </div>
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="text"
                placeholder="Full Name"
                style={{ height: "40px" }}
              />
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="email"
                placeholder="Email (Optional)"
                style={{ height: "40px" }}
              />
              <div className="d-flex my-3" style={{ color: "grey" }}>
                {" "}
                <label>Select Gender:</label>
                <div className="ml-auto d-flex">
                  <input type="radio" name="btn" className="form-check mr-2" />
                  <label>Female</label>
                  <input
                    type="radio"
                    name="btn"
                    className="form-check mr-2 ml-4"
                  />
                  <label>Male</label>
                </div>
              </div>
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
                  className="form-control shadow-none rounded-0"
                  type="tel"
                  placeholder="Alternate Mobile Number"
                  pattern="[0-9]{10}"
                  style={{ height: "40px", paddingLeft: "54px" }}
                />
              </div>
              <label style={{ color: "#A9ABB3", fontSize: "14px" }}>
                This will help recover your account if needed
              </label>
            </div>
            <div>
              <input
                className="form-control shadow-none mt-3 rounded-0"
                type="text"
                placeholder="Hint name (Alternate number)"
                style={{ height: "40px" }}
              />
              <label
                className="mb-2"
                style={{ color: "#A9ABB3", fontSize: "14px" }}
              >
                This name will be a hint for your alternate number
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-danger border-0 w-100 rounded-0 mt-4 py-2 mb-2"
              style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
              onClick={setupAcc}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
