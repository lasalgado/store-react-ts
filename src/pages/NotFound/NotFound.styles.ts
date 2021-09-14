import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        paper: {
            padding: theme.spacing(8),
            margin: 'auto',
            maxWidth: 600,
            textAlign: 'center'
        },
        containerNotFound: {
            height: '100%',
            marginTop: theme.spacing(8),
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: 'black',
        },
        subtitle: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        }
    }),
);