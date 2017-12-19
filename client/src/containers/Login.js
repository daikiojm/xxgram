import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Border, Heading, Label, Flex, Box } from 'rebass';
import { fetchUser } from './../actions/auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        username: '',
        password: '',
      }
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  /**
   * Input(text)要素のイベントハンドラ
   * 入力の変更があるたびに発火
   */
  handleFormChange(e) {
    let data = this.state.form;
    switch(e.target.name) {
      case 'username':
        data.username = e.target.value;
        break;
      case 'password':
        data.password = e.target.value;
        break;
      default:
        break;
    }
    this.setState({form: data});
  }

  /**
   * ログインボタン押下時のイベントハンドラ
   */
  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.form.username;
    const password = this.state.form.password;

    this.fetchLogin(username, password);
  }

  /**
   * Login APIを呼び出し
   */
  fetchLogin(username, password) {
    this.props.dispatch(fetchUser({
      username: username,
      password: password
    }));
  }

  /**
   * Storeからログイン状態を検証 
   * 不正ならばリダイレクトする
   * (本当はルーティング前にやりたい...)
   */
  userWillTransfer(props, router) {
    if (props.auth.isLoggedIn) {
      router.history.push('/');
    }
  }

  render() {
    return (
      <div className="Login">
          <Flex justify='center'>
            <Box px={2} w={1/3}>
              <Border bottom mb={12}>
                <Heading is='h2' fontSize={12} color='gray8' mt={24}>ログイン</Heading>
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
                <Flex justify='center'>
                  <Box w={3/4}>
                    <Button w={1} onClick={this.handleSubmit.bind(this)}>ログイン</Button>
                  </Box>
                </Flex>
              </form>
            </Box>
          </Flex>
      </div>
    );
  }
}

function select({ auth }) {
  return { auth };
}

export default connect(select)(Login);
