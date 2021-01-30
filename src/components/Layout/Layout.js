import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
// import Footer from '../Navigation/Footer/Footer';
const layout = (props) => {
    return (
        <Aux>
            <div>
                <Toolbar />
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
            {/* <Footer /> */}
        </Aux>
    );

};

export default layout;