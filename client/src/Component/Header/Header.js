import React from "react";

const Header = (props) => {
  const {
    content,
    width,
    borderRadius,
    fontSize,
    padding,
    fontWeight,
    backgroundColor,
    color,
  } = props;

  const headerStyle = {
    width: width,
    borderRadius: borderRadius,
    backgroundColor: backgroundColor,
    padding: padding ? padding : "1rem",
    color: color ? color : "black",
    fontWeight: fontWeight ? fontWeight : "bold",
    fontSize: fontSize ? fontSize : "1.5rem",
    textTransform: "capitalize",
  };

  return <header style={headerStyle}>{content ? content : "Header"}</header>;
};

export default Header;
