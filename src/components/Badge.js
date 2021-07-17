import React from "react";

const Badge = (props) => {
  return props.genres.map((item, index) => (
    <span key={index} className="badge rounded-pill bg-success me-1">
      {item}
    </span>
  ));
};

export default Badge;
