import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ crumbs, style  }) => {
  const currentLocation = useLocation();

  return (
    <div className="breadcrumbs" style={style}>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && " / "}
          {crumb.path ? (
            <Link to={crumb.path} style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: currentLocation.pathname === crumb.path ? "crimson" : "#0148bf",
                  textDecoration: "underline",
                }}
              >
                {crumb.label}
              </span>
            </Link>
          ) : (
            <span
              style={{
                color: currentLocation.pathname === crumb.path ? "red" : "blue",
                textDecoration: "underline",
              }}
            >
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
