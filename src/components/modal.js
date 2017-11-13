import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = { showing: true };
    }

    render() {

        var buttons, priceInput = null;
        if (this.props.create) {
            buttons = <button className="btn btn-form-submit btn-modal-form-submit" type="submit">Save</button>;
        }
        else {
            buttons = <div className="card-modal-button-wrapper">
                <div className="modal-left-button">
                    <button className="btn button btn-delete modal-left-button-btn">Delete</button>
                </div>
                <div className="modal-right-button">
                    <button className="btn modal-right-button-btn" type="submit">Save</button>
                </div>
            </div>
        }
        if (this.props.price) {
            priceInput = <input id="price_input" name="price" value="" type="number" className="form-input form-control" placeholder="Enter Price" />
        }

        if (this.state.showing) {
            return (
                <div className="card-modal" id="crud-div">
                    <div className="card crud-card drop-shadow">
                        <span className="close" onClick={() => this.closeModal()}>&times;</span>
                        <h3 className="title crud-title">{this.props.title}</h3>
                        <form action="" method="post" className="register-form" id="">
                            <input id="visible_input" name="" type="text" className="form-control" value="" placeholder="" />
                            {priceInput}
                            {buttons}
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    closeModal() {
        this.setState({ showing: false });
    }
}

export default Modal;