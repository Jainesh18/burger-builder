import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assests/images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='MyBurger' /> {/*using burgerLogo will simply refer to string at the end */}
    </div>
);

export default logo;