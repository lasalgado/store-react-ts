import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import { FC } from 'react';
import TopNav from "../components/TopNav/TopNav";
import { useStyles } from "./AppLayout.styles";

type Props = { children?: any };

const AppLayout: FC = ({ children }: Props) => {
    const classes = useStyles();

    return (
        <div id="app-container">
            <CssBaseline />
            <TopNav />
            <main>
                <Container maxWidth="md" className={classes.mainContainer}>
                    {children}
                </Container>
            </main>
        </div>
    )
}

export default AppLayout;
