import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
//import Footer from '../Navigation/Footer/Footer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        return (
            <Aux>
                <div>
                    <Toolbar toggler={this.sideDrawerToggler} />
                    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                {/* <Footer /> */}
            </Aux>
        );
    }
};

export default Layout;