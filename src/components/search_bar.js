import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    //Render the search bar input
    render() {
        return (
            <div className="search-bar">
                <input
                    className="form-control"
                    placeholder="Search"
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    //Handle the event of changing the search term in the search bar
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;