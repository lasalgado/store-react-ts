import { FC } from 'react'
import { useHistory } from "react-router-dom";
import { Avatar, Button, Container, Paper, Typography } from '@material-ui/core';
import { useStyles } from './NotFound.styles';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';

const NotFound: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="sm" className={classes.containerNotFound}>
      <Paper className={classes.paper} elevation={3} >
        <div className={classes.root}>
          <Avatar className={classes.avatar} >
            <StorefrontOutlinedIcon />
          </Avatar>
          <Typography variant="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h3" gutterBottom>
            Not Found
          </Typography>
          <Typography variant="subtitle1" gutterBottom className={classes.subtitle} >
            Sorry! we couldn't find what you are looking for...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              history.push('/')
            }}
          >
            Go back home
          </Button>
        </div>
      </Paper>
    </Container >
  );
};

export default NotFound;
