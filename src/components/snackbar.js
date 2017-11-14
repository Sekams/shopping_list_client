import React, {Component} from 'react';

class SnackBar extends Component {
    constructor(props) {
        super(props);

        this.state = { class: props.class + " show"};
    }

    showSnackBar() {
        const theSnackBar = this;
        setTimeout(
            function() { 
                theSnackBar.setState({class: theSnackBar.props.class});
            }, 
            3000
        );
    }

    render (){
        this.showSnackBar();
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