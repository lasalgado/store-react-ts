import { FC, SyntheticEvent } from 'react';
import { useForm, FormProps } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { setDisplayModal } from '../../redux/rootSlice';
import { setAuth } from "../../redux/authSlice";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '../../components/Alert/Alert';
import useStyles from './SignUp.style';
import AuthService from '../../services/AuthService';

import {
  setLocalAuth,
  emailValidator,
  passwordValidator,
  usernameValidator
} from '../../utils/utils';

const formInfo: FormProps = {
  display_name: {
    id: "id_display_name",
    value: "",
    error: null,
    required: true,
    validator: usernameValidator
  },
  email: {
    id: "id_email",
    value: "",
    error: null,
    required: true,
    validator: emailValidator
  },
  password: {
    id: "id_password",
    value: "",
    error: null,
    required: true,
    validator: passwordValidator
  }
};

const SignUp: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    form,
    handleInputValue,
    isValidForm,
    getFormData
  } = useForm(formInfo);
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isValidForm) {
      let {
        email,
        display_name: displayName,
        password
      } = getFormData();

      try {
        let token_data = await AuthService.signup({
          email,
          displayName,
          password
        });

        let user_data = await AuthService.get_user({
          headers: { 'x-auth-token': token_data.data.token },
        });

        if (token_data.data.token && user_data.data) {
          let authInfo = {
            user: { ...user_data.data },
            token: token_data.data.token
          };
          setLocalAuth(authInfo);
          dispatch(setAuth(authInfo));
        }

        history.push('/');

      } catch (error) {
        let textMessage = "";

        if (error) {
          let { status, data }: any = error;

          if (status === 400 && !data.success && data.message === "email already registered!") {
            textMessage = 'Email already registered!';
          } else {
            textMessage = 'An error ocurred while logging in, please try again!';
          }
        } else {
          textMessage = 'An error ocurred while logging in, please try again!';
        }

        dispatch(setDisplayModal({
          type: 'error',
          state: true,
          text: textMessage,
          autoHideDuration: 5000
        }));
      }
    } else {
      dispatch(setDisplayModal({
        type: 'error',
        state: true,
        text: "The information is invalid, please check before continuing.",
        autoHideDuration: 5000
      }));
    }
  };

  const handleLinks = (event: SyntheticEvent) => {
    const el = (event.target as HTMLElement);
    let dataset = el.tagName === 'SPAN' ? el.parentElement?.dataset : el.dataset;
    let name = dataset ? dataset.name : "";

    switch (name) {
      case 'backHome':
        history.push('/');
        break;
      case 'signIn':
        history.push('/login');
        break;
      default:
        return true;
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.signincont}>
      <Alert />
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
                value={form.display_name.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                {...(form.display_name.error && { error: true, helperText: form.display_name.error })}
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
                value={form.email.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                {...(form.email.error && { error: true, helperText: form.email.error })}
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
                value={form.password.value}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                {...(form.password.error && { error: true, helperText: form.password.error })}
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
                onClick={handleLinks}
                data-name="signIn"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleLinks}
                data-name="backHome"
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
