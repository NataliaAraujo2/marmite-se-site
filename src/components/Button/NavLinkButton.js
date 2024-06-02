import React from "react";
import styles from "./Button.module.css";
import { NavLink } from "react-router-dom";

const NavLinkButton = ({ to, onClick, Text, Icon }) => {
  return (
    <NavLink to={to} onClick={onClick}>
      <div className={styles.button}>
        <Icon />
        {Text}
      </div>
    </NavLink>
  );
};

export default NavLinkButton;
