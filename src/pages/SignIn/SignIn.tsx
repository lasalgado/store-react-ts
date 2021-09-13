import { useState, SyntheticEvent } from 'react';
import { useHistory, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useStyles from './SignIn.style';
// import AuthService from '../../services/AuthService';
// import { setToken, setUser } from "../../redux/authSlice";
// import {
//   emailValidator,
//   passwordValidator,
//   validForm,
//   setLocalUser,
//   setLocalToken,
//   getFormErrors
// } from '../../utils/utils';

const formInfo = {
  email: {
    id: "id_email",
    value: "",
    error: null,
    validator: null
  },
  password: {
    id: "id_password",
    value: "",
    error: null,
    validator: null
  }
};

const alertInit = {
  formAlertOpen: false,
  type: '',
  text: '',
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  // const dispatch = useDispatch();
  const queryParams = useQuery();
  const [currentForm, setCurrentForm] = useState(formInfo);
  const [alertInfo, setAlertInfo] = useState(alertInit);

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    // if (validForm(currentForm)) {
    //   try {
    //     let token_data = await AuthService.login({
    //       email: currentForm.email.value,
    //       password: currentForm.password.value
    //     });

    //     let user_data = await AuthService.get_user({
    //       headers: { 'x-auth-token': token_data.data.token },
    //     });

    //     if (token_data.data.token && user_data.data) {
    //       dispatch(setToken(token_data.data.token));
    //       dispatch(setUser(user_data.data));
    //       setLocalToken(token_data.data.token);
    //       setLocalUser(user_data.data);
    //     }

    //     let next = queryParams.get("next");

        
    //     setAlertInfo({ formAlertOpen: true, type: 'success', text: 'Redirecting...'});
    //     closeAlert();
    //     history.push(next ? next : '/');
    //   } catch (error) {
    //     if (error.response && error.response.status === 400
    //       && !error.response.data.success
    //       && error.response.data.message === "invalid credentials!") {
    //       setAlertInfo({ formAlertOpen: true, type: 'error', text: 'The credentials used are not valid!'});
    //       closeAlert();
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

  const handleCreateAccount = () => {
    history.push('/register');
  }

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

  return (
    <Container component="main" maxWidth="xs" className={classes.signincont}>
      <CssBaseline />
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorefrontOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
          noValidate
          onSubmit={handleFormSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={currentForm.email.value}
            onChange={handleInputValue}
            onBlur={handleInputValue}
            {...(currentForm.email.error && { error: true, helperText: currentForm.email.error })}
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
            value={currentForm.password.value}
            onChange={handleInputValue}
            onBlur={handleInputValue}
            {...(currentForm.password.error && { error: true, helperText: currentForm.password.error })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateAccount}
          >
            Create your ReactEShop Account
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleBackHome}
          >
            Go back home
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
