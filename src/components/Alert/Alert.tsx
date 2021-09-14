import Snackbar from '@material-ui/core/Snackbar';
import { default as MaterialAlert } from '@material-ui/lab/Alert';
import { setDisplayModal } from '../../redux/rootSlice';
import { getModal } from '../../redux/selectors/root.selector';
import useStyles from './Alert.styles';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { DisplayModal } from "../../redux/rootSlice";

const Alert = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const {
        state,
        text,
        type,
        autoHideDuration
    }: DisplayModal = useAppSelector(getModal);

    return (
        <Snackbar open={state}
            className={classes.root}
            autoHideDuration={autoHideDuration}
            onClose={() => { dispatch(setDisplayModal({ state: false, text: '', type: 'error' })) }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <MaterialAlert severity={type}>{text}</MaterialAlert>
        </Snackbar>
    )
}

export default Alert;