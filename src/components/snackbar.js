import React, { Component } from 'react';

const timer = require('react-native-timer');

class SnackBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            class: props.class
        };

        //Request an animation frame in the view
        requestAnimationFrame(() => this.showSnackBar())
    }

    // Ensure that the component has been mounted into view
    componentDidMount() {
        this._mounted = true;
        global.localStorage.setItem("message", "");
        global.localStorage.setItem("messageType", "");
    }

    //Check if the component is yet to be mouted into view
    componentWillUnmount() {
        this._mounted = false;
        timer.clearTimeout(this);
    }

    //Set the timeout for showing the Snackbar animation 
    showSnackBar() {
        if (this._mounted) {
            this.setState({ class: this.props.class + " show" }, () => timer.setTimeout(
                this, 'hideSnackBar', () => this.setState({ class: this.props.class }), 3000
            ));
        }
    }

    render() {
        return (
            <div
                id="snackbar"
                // Class can be 'danger-snackbar' or 'success-snackbar'
                className={this.state.class} >
                <p>{this.props.message}</p>
            </div>
        );
    }
}

export default SnackBar;