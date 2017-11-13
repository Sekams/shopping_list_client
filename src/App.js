import React, { Component } from 'react';
import NavBar from './components/nav_bar'
// import LoginFrom from './components/login_form'
// import RegistrationForm from './components/registration_form'
// import ShoppingListItem from './components/shopping_list_item'
// import ShoppingList from './components/shopping_list'
// import HomePage from './components/home_page'
import SnackBar from './components/snackbar'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Sekams',
      authorized: true,
      logged_in: true,
      page: 'home'
    };
  }

  render() {
    var toiletries = [
      {
        name: "Soap",
        price: "200",
        status: true
      },
      {
        name: "Deodorant",
        price: "300",
        status: false
      },
      {
        name: "Shaver",
        price: "100",
        status: false
      },
      {
        name: "Perfume",
        price: "600",
        status: true
      }
    ]
    var groceries = [
      {
        name: "Tomatoes",
        price: "20",
        status: false
      },
      {
        name: "Onions",
        price: "50",
        status: true
      }
    ]
    var shoppingLists = [
      {
        title: "Toiletries",
        shoppingListItems: toiletries
      },
      {
        title: "Groceries",
        shoppingListItems: groceries
      }
    ]
    return (
      <div>
        <NavBar
          username={this.state.username}
          authorized={this.state.authorized}
          logged_in={this.state.logged_in}
          page={this.state.page} />
        {/* <LoginFrom /> */}
        {/* <RegistrationForm /> */}
        {/* <HomePage
          shoppingLists={shoppingLists} /> */}
        <SnackBar
          class="success-snackbar"
          message="It works" />
      </div>
    );
  }
}

export default App;
