import React from 'react';
import CheckBox from './check_box'

const ShoppingListItem = (props) => {
    
    return (
        <div id="card-item" className="list-card">
            <div id="label-item">
                <div>
                    <a>
                        <div>
                            <h4>{props.name}</h4>
                        </div>

                        <div>
                            <h6>
                                SHS {props.price}
                            </h6>
                        </div>
                    </a>
                </div>
            </div>
            <CheckBox
                id="checkbox-item"
                status={props.status} />
        </div>
    );
}

export default ShoppingListItem;