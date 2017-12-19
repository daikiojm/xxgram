import React, { Component } from 'react';
import './App.css';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users:[
        {
          username: '',
          password: '' 
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('/api/user')
      .then(res => res.json())
      .then(json => {
        this.setState({users: json.userlist});
      })
      .catch(console.log)
  }

  UserItem() {
    return this.state.users.map((user, i) => {
      return (
        <tr key={i}>
          <th>{user.username}</th>
          <th>{user.password}</th>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="Users">
        <table className="Userlist">
          <tbody>
            {this.UserItem()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
