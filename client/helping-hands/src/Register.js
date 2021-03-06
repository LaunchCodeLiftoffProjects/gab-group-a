import React, {useState} from 'react';
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
import axios from 'axios';
import { Redirect } from 'react-router'; 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Helping Hands
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/iJ2IG8ckCpA)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const [state, setState] = useState({
    name: "",
    password: "",
    verifyPassword: "",
    location: {id: 1} //adding place holder, update db with generic default value at some point. 
  })

  const [errorMessage, setErrorMessage] = useState('');

  const redirectToHome = () => {
    window.location.href = "/"
  }

  const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleSubmitClick = (e) => {
  e.preventDefault();
  if(state.password === state.verifyPassword) {
      setErrorMessage('');
      sendDetailsToServer();    
  } else {
      setErrorMessage("Passwords do not match.");
  }
}

function nameCheck(userName) {
  let check = true;
  if (userName.length < 3 || userName.length > 20){
    check = false;
  }
  return check
}

function passCheck(passWord){
let check = true;
if (passWord.length < 5 || passWord.length > 30){
  check = false;
}
return check
}

const sendDetailsToServer = () => {
  if(nameCheck(state.name) === true 
  && passCheck(state.password) === true) {
      setErrorMessage('');
      const payload={
          username:state.name,
          password:state.password,
          verifyPassword: state.verifyPassword,
          location:state.location //this fixes the null pointer DB problem but need a better fix going forward. 
      }
      axios.post("http://localhost:8080/register", payload)
      .then(function (response) {
          if(response.status === 200 && response.data === 'Registration successful.'){
            console.log(response)
              setState(prevState => ({
                  ...prevState,
                  'successMessage' : 'Registration successful. Redirecting to home page..'
              }))
              setErrorMessage('');
              redirectToHome();
          } else{
              setErrorMessage(response.data);
          }
      })
      .catch(function (error) {
          console.log(error);
      });    
} else {
if(nameCheck(state.name) === false){
  setErrorMessage('Username must be between 3 and 20 characters.')
}
if(passCheck(state.password) === false){
  setErrorMessage('Password must be between 5 and 30 characters.')
}
}
}

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              autoFocus
              value={state.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="verifyPassword"
              label="Verify Password"
              type="password"
              id="verifyPassword"
              autoComplete="current-password"
              value={state.verifyPassword}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errorMessage && (
            <p className="error" style={{ color:'red'}}> {errorMessage} </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitClick}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}