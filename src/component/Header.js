import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { purple } from "@material-ui/core/colors";
import "./Header.css";
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const Header = () => {
  return (
    <div className="app-header">
      <h1>Nipa.Cloud</h1>
      <div className="header-link">
        <ColorButton variant="contained" color="primary" href="/">
          upload
        </ColorButton>
        <ColorButton variant="contained" color="primary" href="/webcam">
          webcam
        </ColorButton>
      </div>
    </div>
  );
};

export default Header;
