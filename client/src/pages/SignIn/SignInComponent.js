import Button from "@material-ui/core/Button";
import Page from "material-ui-shell/lib/containers/Page";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
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

const SignInComponent = (props) => {
  const classes = useStyles();
  const intl = useIntl();
  const history = useHistory();
  const userType = history.location.pathname.split("/")[2]; // pathname: /auth/staff/login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableForm, setDisableForm] = useState(false);
  const { setAuthMenuOpen } = useMenu();
  const { setAuth } = useAuth();

  const displayUserType = getDisplayUserType(userType);

  function handleSubmit(event) {
    event.preventDefault();
    // authenticate({
    //   displayName: "User",
    //   email: email,
    // });
    const { onsubmit } = props;
    if (!disableForm) {
      setDisableForm(true);
      onsubmit(email, password);
      setAuth({ isAuthenticated: true });
      setAuthMenuOpen(false);
    }
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user });
    setAuthMenuOpen(false);

    let _location = history.location;

    let _route = "/home";
    if (_location.state && _location.state.from) {
      _route = _location.state.from.pathname;
      history.push(_route);
    } else {
      history.push(_route);
    }
  };

  return (
    <Page pageTitle={intl.formatMessage({ id: "sign_in" })}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography
            component="h1"
            variant="h5"
            style={{ textTransform: "capitalize" }}
          >
            {`${displayUserType} ${intl.formatMessage({ id: "sign_in" })}`}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              disabled={disableForm}
              value={email}
              onInput={(e) => setEmail(e.target.value)}
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
              autoFocus
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
              label={intl.formatMessage({ id: "password" })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {props.error ? (
              <span>
                <b>Error</b>: {props.error}
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: "sign_in" })}
            </Button>
          </form>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Link to="/password_reset">
              {intl.formatMessage({ id: "forgot_password" })}?
            </Link>
            <Link to={`/auth/${userType}/signup`}>
              {intl.formatMessage({ id: "registration" })}
            </Link>
          </div>
        </div>
      </Paper>
    </Page>
  );
};

export default SignInComponent;
