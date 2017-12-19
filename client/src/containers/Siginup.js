import React, { Component } from 'react';
import { Input, Button, Border, Heading, Label, Flex, Box } from 'rebass';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        username: '',
        password: '',
        confirmation: '',
      }
    };
  }

  handleFormChange(e) {
    let data = this.state.form;
    switch(e.target.name) {
      case 'username':
        data.username = e.target.value;
        break;
      case 'password':
        data.password = e.target.value;
        break;
      case 'confirmation':
        data.confirmation = e.target.value;
        break;
      default:
        break;
    }
    this.setState({form: data});
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.form.username;
    const password = this.state.form.password;
    const confirmation = this.state.form.confirmation;

    if (username && (password === confirmation)) {
      this.fetchUser(username, password);
    } else {
      console.log('err');
    }
  }

  fetchUser(username, password) {
    const postObject = {
      username: username,
      password: password,
    };
    const method = 'POST';
    const body = JSON.stringify(postObject);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch('/api/user', {method, headers, body})
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="Siginup">
        <Flex justify='center'>
          <Box px={2} w={1/3}>
            <Border bottom mb={12}>
              <Heading is='h2' fontSize={12} color='gray8' mt={24}>新規登録</Heading>
            </Border>
            <form>
              <Label mb={-3}>ユーザー名</Label>
              <p>
                <Input bg='white' name="username" type="text" placeholder="Username"
                  value={this.state.form.username} onChange={this.handleFormChange.bind(this)}/>
              </p>
              <Label mb={-3}>パスワード</Label>
              <p>
                <Input bg='white' name="password" type="password" placeholder="Password"
                  value={this.state.form.password} onChange={this.handleFormChange.bind(this)} />
              </p>
              <Label mb={-3}>パスワード確認</Label>
              <p>
                <Input bg='white' name="confirmation" type="password" placeholder="Password(確認)"
                  value={this.state.form.confirmation} onChange={this.handleFormChange.bind(this)}/>
              </p>
              <Flex justify='center'>
                <Box w={1/2}>
                  <p><Button w={1} onClick={this.handleSubmit.bind(this)}>登録</Button></p>
                </Box>
              </Flex>
            </form>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default Signup;
