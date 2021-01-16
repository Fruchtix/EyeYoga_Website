import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

function Programm({ name }) {
  return (
    <div>
      <div></div>
      <h3>{name}</h3>
      <Link to={ROUTES.THIRDYDAYCHALLENGE}>
        <button>Start</button>
      </Link>
    </div>
  );
}

export default Programm;
