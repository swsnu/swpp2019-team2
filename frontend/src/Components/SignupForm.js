import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../image/LOGO.png';
import signupLogo from '../image/Signup.jpg';


const useStyleSignup = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${signupLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  root: {
    height: '100vh',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function SignInSide(props) {
  const classes = useStyleSignup();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="username-input"
                  label="Username"
                  autoFocus
                  value={props.username}
                  onChange={props.usernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email-input"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={props.email}
                  onChange={props.emailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password-input"
                  autoComplete="current-password"
                  value={props.password}
                  onChange={props.passwordChange}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Button
              id="signup"
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={props.clickedSignup}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <br />
                <Link id="signin" href="login" variant="body2" onClick={props.clickedSignin}>
                  Already have an account? Sign in
                </Link>
                <br />
                <br />
                <Link id="main" href="search" variant="body2" onClick={props.clickedBack}>
                  Back to main page
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Typography component="h1" variant="h5">
          <img id="logo" src={logo} alt="COSMOS" width="100" />
        </Typography>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            &apos;Copyright ©&apos;
            <Link color="inherit" href="https://material-ui.com/">
              Cosmos
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
