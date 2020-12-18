import React from "react";
import Footer from "../../accessories/footer/Footer";
import logo from "../../../assets/logo-color.svg";
import { Link } from "react-router-dom";
import { T } from '@transifex/react';

const NotFound: React.FC = () => {
  return (
    <div className="login">
      <div className="container login__background">
        <img
          src={logo}
          alt="Open Hospital"
          className="login__logo"
          width="150px"
        />
        <div className="login__title">
          <T _str="404 - Page Not Found" />
        </div>
        <div className="login__link">
          <Link to="/"><T _str="Go back to the dashboard" /></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;