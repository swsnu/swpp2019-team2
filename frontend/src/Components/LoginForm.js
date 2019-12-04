import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../image/LOGO.png';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://previews.123rf.com/images/jikkoh/jikkoh1708/jikkoh170800031/84939189-%ED%99%94%EB%A0%A4%ED%95%9C-%EB%B0%B0%EA%B2%BD%EC%97%90-%EC%9E%A5%EC%8B%9D-%ED%99%94%EC%9E%A5%ED%92%88-%EC%84%B8%ED%8A%B8.jpg)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username-input"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              value={props.username}
              onChange={props.usernameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              id="checkbox"
              label="Remember me"
              defaultChecked={props.check}
              onChange={props.verifiedChange}
            />
            <Button
              id="signin"
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.clickedSignin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link id="signup" href="signup" variant="body2" onClick={props.clickedSignup}>
                  Don&apos;t have an account? Sign Up
                </Link>
                <br/><br/>
                <Link id="main" href="search" variant="body2" onClick={props.clickedBack}>
                  Back to main page
                </Link>
              </Grid>
              </Grid>
            <Box mt={5} />
          </form>
        </div>
        <Typography component="h1" variant="h5">
          <img id="logo" src={logo} alt="COSMOS" width="100" />
        </Typography>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Cosmos
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
