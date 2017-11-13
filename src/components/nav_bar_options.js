import React from 'react';
import NavBarOptionItem from './nav_bar_option_item';

const NavBarOptions = (props) => {
    const optionNames = ["search", "greeting", "link"]
    const options = optionNames.map((optionName) => {
        return <NavBarOptionItem
            key={optionName}
            name={optionName} 
            username={props.username}
            authorized={props.authorized}
            logged_in={props.logged_in}
            page={props.page} />
    });

    return (
        <ul className="nav navbar-nav navbar-right">
            {options}
        </ul>
    );
}

export default NavBarOptions;
