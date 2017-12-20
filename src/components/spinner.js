import React, { Component } from 'react';

class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            class_name: 'hide',
        };
    }

    //Handle the event for showing/hiding the spinner
    showSpinner = (show) => {
        if (show) {
            this.setState({ class_name: "spinner-wrapper" });
        } else {
            this.setState({ class_name: "hide" });
        }
    }

    render() {
        return (
            <div className={this.state.class_name}>
                <ul role="progressbar" aria-busy="true" aria-label="Loading domino shop" className="spinner">
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                    <li role="presentation"></li>
                </ul>
            </div>
        );
    }
}

export default Spinner;