import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../pictures/logo.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(2, 2, 1),
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={logo} alt="logo" style={{ width: "25%" }} />

      <Typography variant="h5" style={{ paddingBottom: "20px", textAlign: "center" }}>
        Welcome to the HealthGeeks Patient-Management-System
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Link
          className={classes.link}
          to="/auth/staff/login"
          style={{ textDecoration: "none" }}
        >
          <Button fullWidth variant="contained" color="primary">
            Staff Member
          </Button>
        </Link>
        <Link
          className={classes.link}
          to="/auth/medical/login"
          style={{ textDecoration: "none" }}
        >
          <Button fullWidth variant="contained" color="primary">
            Medical Staff
          </Button>
        </Link>
        <Link
          className={classes.link}
          to="/auth/nurse/login"
          style={{ textDecoration: "none" }}
        >
          <Button fullWidth variant="contained" color="primary">
            Charge Nurse
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
