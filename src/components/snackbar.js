import React, {Component} from 'react';

class SnackBar extends Component {
    constructor(props) {
        super(props);

        this.state = { showing: true };
    }

    showSnackBar() {
        const theSnackBar = this;
        setTimeout(
            function() { 
                theSnackBar.setState({showing: false});
            }, 
            3000
        );
    }

    render (){
        if (this.state.showing) {
            this.showSnackBar();
            return (
                <div 
                id="snackbar"
                // Class can be 'danger-snackbar' or 'success-snackbar'
                className={this.props.class + " show"} > 
                    <p>{this.props.message}</p>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default SnackBar;