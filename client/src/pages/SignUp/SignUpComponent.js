import Button from "@material-ui/core/Button";
import Page from "material-ui-shell/lib/containers/Page";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "base-shell/lib/providers/Auth";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import { useMenu } from "material-ui-shell/lib/providers/Menu";
import { getDisplayUserType } from "../../utils/displayUserType";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  const userType = history.location.pathname.split("/")[2]; // pathname ex: /auth/staff/login
  const { setAuthMenuOpen } = useMenu();
  const { setAuth } = useAuth();

  const displayUserType = getDisplayUserType(userType);

  function handleSubmit(event) {
    event.preventDefault();
    if (!disableForm) {
      if (
        firstName &&
        lastName &&
        userEmail &&
        password &&
        password.length >= 4
      ) {
        setDisableForm(true);
        props.createUser({
          firstName,
          lastName,
          email:userEmail,
          password,
          confirmPassword,
        });
      }
    }

    setAuth({ isAuthenticated: true });

    setAuthMenuOpen(false);

  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: "sign_up",
        defaultMessage: " Sign up",
      })}
      onBackClick={() => {
        history.goBack();
      }}
    >
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {`${displayUserType} ${intl.formatMessage({
              id: "sign_up",
              defaultMessage: "Sign up",
            })}`}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              disabled={disableForm}
              value={firstName}
              onInput={(e) => setFirstName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="First Name"
              name="first-name"
              autoComplete="first-name"
            />
            <TextField
              disabled={disableForm}
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="Last Name"
              name="last-name"
              autoComplete="last-name"
            />
            <TextField
              disabled={disableForm}
              value={userEmail}
              onInput={(e) => setUserEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={intl.formatMessage({
                id: "email",
                defaultMessage: "E-Mail",
              })}
              name="email"
              autoComplete="email"
            />
            <TextField
              disabled={disableForm}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({
                id: "password",
                defaultMessage: "Password",
              })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              disabled={disableForm}
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirm"
              label={intl.formatMessage({
                id: "password_confirm",
                defaultMessage: "Confirm Password",
              })}
              type="password"
              id="password_confirm"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: "sign_up", defaultMessage: "Sign up" })}
            </Button>
          </form>
        </div>
      </Paper>
    </Page>
  );
};

export default SignUp;
