import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Myntra from "./components/Myntra";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Bag from "./components/Bag";
import Login from "./components/LoginSignup";

const App = () => {
  useEffect(() => {
    document.title = `Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra`;
  });
  return (
    <section>
      <div className="app">
        <Switch>
          <Route exact path="/myntra/:id/bag" component={Bag} />
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/myntra" component={Myntra} />
            <Route exact path="/myntra/:id" component={Products} />
            <Route exact path="/login" component={Login} />
          </div>
        </Switch>
        <Footer />
      </div>
    </section>
  );
};
export default App;
