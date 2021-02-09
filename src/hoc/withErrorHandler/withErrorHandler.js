import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }
        constructor(props){
            super(props);
            this.reqInterceptors=axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res, error => {
                this.setState({ error: error });
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        //In future this method will no longer be used and instead of this you can use constructor
        // componentWillMount() {
            // axios.interceptors.request.use(req => {
            //     this.setState({ error: null });
            //     return req;
            // })
            // axios.interceptors.response.use(res=>res, error => {
            //     this.setState({ error: error });
            // })
        // }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;