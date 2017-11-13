import React from 'react';
import ShoppingList from './shopping_list';
import Modal from './modal'

const HomePage = (props) => {
    const shoppingLists = props.shoppingLists.map((shoppingList) => {
        return <ShoppingList
            key={shoppingList.title}
            title={shoppingList.title}
            shoppingListItems={shoppingList.shoppingListItems} />
    });

    return (
        <div>
            <div className="wrapper">
                <div className="home-wrapper">
                    {shoppingLists}
                </div>
            </div>

            <a className="btn-fab round-button">
                <i className="fab-icon fa-plus"></i>
            </a>

            <Modal
                title="Modal"
                create={true} />
        </div>
    );
}

export default HomePage;
