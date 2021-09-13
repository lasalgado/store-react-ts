import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer:{
            backgroundColor: 'yellow',
            marginTop: theme.spacing(4),
        }
    }),
);