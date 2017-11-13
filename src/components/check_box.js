import React, {Component} from 'react';

class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = { status: props.status };
    }

    render () {
        if (this.state.status) {
            return (
                <input
                    id={this.props.id}
                    type="checkbox"
                    checked
                    onChange={event =>  this.onInputChange(event.target.value)} />
            );
        }

        return (
            <input
                id={this.props.id}
                type="checkbox"
                onChange={event =>  this.onInputChange(event.target.value)} />
        );
    }

    onInputChange(status) {
        this.setState({status});
    }
}

export default CheckBox;