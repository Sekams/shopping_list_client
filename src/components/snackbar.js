import React, { Component } from 'react';

const timer = require('react-native-timer');

class SnackBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            class: props.class
        };

        requestAnimationFrame(() => this.showSnackBar())
    }



    componentDidMount() {
        this._mounted = true;
        localStorage.setItem("message", "");
        localStorage.setItem("messageType", "");
    }

    componentWillUnmount() {
        this._mounted = false;
        timer.clearTimeout(this);
    }

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