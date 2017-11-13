import React from 'react';
import ShoppingListItem from './shopping_list_item';

const ShoppingList = (props) => {
    const shoppingListItems = props.shoppingListItems.map((item) => {
        return <ShoppingListItem
            key={item.name}
            name={item.name} 
            price={item.price}
            status={item.status} />
    });

    return (
        <div id="card-shopping" className="card-container">
            <h4>{props.title}</h4>
            <div className="card-icon-holder" id="card-icon-holder">
                <a id="add-item">
                    <i className="icons fa-plus-circle"></i>
                </a>

                <a id="edit-shopping">
                    <i className="icons fa-pencil"></i>
                </a>

                <a id="share-shopping"> 
                    <i className="icons fa-share-alt"></i>
                </a>

                <a id="delete-shopping">
                    <i className="icons fa-trash"></i>
                </a>
            </div>
                <div className="shopping-list-items-wrapper">
                    {shoppingListItems}
                </div>
        </div>
    );
}

export default ShoppingList;
