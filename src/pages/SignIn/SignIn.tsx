import { SyntheticEvent, FC } from 'react';
import { useHistory } from "react-router-dom";
import { useForm, FormProps } from "../../hooks/useForm";
import { setAuth } from "../../redux/authSlice";
import { setDisplayModal } from '../../redux/rootSlice';
import { useAppDispatch, useQuery } from "../../hooks/hooks";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AuthService from '../../services/AuthService';
import Alert from '../../components/Alert/Alert';
import {
  setLocalAuth,
  emailValidator,
  passwordValidator,
} from '../../utils/utils';
import useStyles from './SignIn.style';

const formInfo: FormProps = {
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

const SignIn: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const queryParams = useQuery();
  const {
    form,
    handleInputValue,
    isValidForm,
    getFormData
  } = useForm(formInfo);

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isValidForm) {
      let token_data = await AuthService.login(getFormData());

      if ('success' in token_data) {
        if (token_data.success && token_data.success) {
          let user_data = await AuthService.get_user({
            headers: { 'x-auth-token': token_data.data.token },
          });

          if ('success' in user_data && user_data.success) {
            let authInfo = {
              user: { ...user_data.data },
              token: token_data.data.token
            };

            setLocalAuth(authInfo);
            dispatch(setAuth(authInfo));

            let next = queryParams.get("next");
            history.push(next ? next : '/');
          } else {
            let textError: string = token_data.message ? token_data.message : 'An error ocurred while logging in, please try again!';
            dispatch(setDisplayModal({ state: true, text: textError, type: 'error' }))
          }
        }
      } else {
        let textError: string = token_data.message ? token_data.message : 'An error ocurred while logging in, please try again!';
        dispatch(setDisplayModal({ state: true, text: textError, type: 'error', autoHideDuration: 10000 }))
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
      case 'createAccount':
        history.push('/register');
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
            value={form.email.value}
            onChange={handleInputValue}
            onBlur={handleInputValue}
            {...(form.email.error && { error: true, helperText: form.email.error })}
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
            value={form.password.value}
            onChange={handleInputValue}
            onBlur={handleInputValue}
            {...(form.password.error && { error: true, helperText: form.password.error })}
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
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLinks}
            data-name="createAccount"
          >
            Create your ReactEShop Account
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleLinks}
            data-name="backHome"
          >
            Go back home
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
