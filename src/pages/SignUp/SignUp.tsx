import { useState, SyntheticEvent } from 'react';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './SignUp.style';
// import { setToken, setUser } from "../../redux/authSlice";
// import AuthService from '../../services/AuthService';
// import { useDispatch } from "react-redux";

// import {
//   setLocalToken,
//   setLocalUser,
//   usernameValidator,
//   emailValidator,
//   passwordValidator,
//   validForm,
//   getFormErrors
// } from '../../utils/utils';

// const formInfo = {
//   display_name: {
//     id: "id_display_name",
//     value: "",
//     error: null,
//     validator: usernameValidator
//   },
//   email: {
//     id: "id_email",
//     value: "",
//     error: null,
//     validator: emailValidator
//   },
//   password: {
//     id: "id_password",
//     value: "",
//     error: null,
//     validator: passwordValidator
//   }
// };

const alertInit = {
  formAlertOpen: false,
  type: '',
  text: '',
}

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  // const dispatch = useDispatch();
  // const [currentForm, setCurrentForm] = useState(formInfo);
  const [alertInfo, setAlertInfo] = useState(alertInit);

  const closeAlert = () => {
    setTimeout(() => {
      onCloseAlertForm();
    }, 600);
  }

  const onCloseAlertForm = () => {
    setAlertInfo({
      formAlertOpen: false,
      type: '', 
      text: ''
    });
  }

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    // if (validForm(currentForm)) {
    //   try {
    //     let token_data = await AuthService.signup({
    //       email: currentForm.email.value,
    //       displayName: currentForm.display_name.value,
    //       password: currentForm.password.value,
    //     });

    //     console.log(token_data);

    //     let user_data = await AuthService.get_user({
    //       headers: {'x-auth-token': token_data.data.token },
    //     });

    //     console.log(user_data);
        
    //     if(token_data.data.token && user_data.data){
    //       dispatch(setToken(token_data.data.token));
    //       dispatch(setUser(user_data.data));
    //       setLocalToken(token_data.data.token);
    //       setLocalUser(user_data.data);
    //     }
    //     setAlertInfo({ formAlertOpen: true, type: 'success', text: 'Redirecting...'});
    //     closeAlert();
    //     history.push('/');
    //   } catch (error) {
    //     if (error.response && error.response.status === 400
    //       && !error.response.data.success
    //       && error.response.data.message === "email already registered!") {
    //         setAlertInfo({ formAlertOpen: true, type: 'error', text: 'Email already registered!'});
    //         closeAlert();
    //     } else {
    //       setAlertInfo({ formAlertOpen: true, type: 'error', text: 'An error ocurred while logging in, please try again!'});
    //       closeAlert();
    //     }
    //   }
    // } else {
    //   setAlertInfo({ formAlertOpen: true, type: 'error', text: getFormErrors(currentForm)});
    //   closeAlert();
    // }

  };

  const handleInputValue = (event: SyntheticEvent) => {
    // const { name, value } = event.target;
    // setCurrentForm({
    //   ...currentForm,
    //   [name]: {
    //     ...currentForm[name],
    //     value: value,
    //     error: currentForm[name].validator(value).msg
    //   }
    // });
  };


  const handleBackHome = () => {
    history.push('/');
  }

  const handleSignInLink = () => {
    history.push('/login');
  }


  return (
    <Container component="main" maxWidth="xs" className={classes.signincont}>
           {/* {alertInfo.formAlertOpen ?
        <Alert
          variant="filled" 
          severity={alertInfo.type}
          onClose={onCloseAlertForm}
        >
          { Array.isArray(alertInfo.text) ? 
           alertInfo.text.map((item) => {
           return (
              <p>{item}</p>)
           }) : <p>{alertInfo.text}</p> }
        </Alert> : null
      } */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorefrontOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}
          noValidate
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="dName"
                name="display_name"
                variant="outlined"
                required
                fullWidth
                id="id_display_name"
                label="Username"
                autoFocus
                // value={currentForm.display_name.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                // {...(currentForm.display_name.error && { error: true, helperText: currentForm.display_name.error })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id_email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // value={currentForm.email.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                // {...(currentForm.email.error && { error: true, helperText: currentForm.email.error })}
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
                id="id_password"
                autoComplete="current-password"
                // value={currentForm.password.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                // {...(currentForm.password.error && { error: true, helperText: currentForm.password.error })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleSignInLink}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleBackHome}
              >
                Go back home
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
