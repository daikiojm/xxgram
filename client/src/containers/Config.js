import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Border, Container, Heading, Image, Text, Label, Flex, Box } from 'rebass';
import { changeDispName } from './../actions/config'

class Config extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        appName: '',
      }
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  /**
   * Input(text)要素のイベントハンドラ
   * 入力の変更があるたびに発火
   */
  handleFormChange(e) {
    let data = this.state.form;
    data.appName = e.target.value;
    this.setState({form: data});
  }

  /**
   * 変更押下時のイベントハンドラ
   */
  handleSubmit(e) {
    e.preventDefault();
    const newAppName = this.state.form.appName;

    this.props.dispatch(changeDispName({
      appName: newAppName
    }));
  }

  /**
   * Storeからログイン状態を検証 
   * 不正ならばリダイレクトする
   * (本当はルーティング前にやりたい...)
   */
  userWillTransfer(props, router) {
    if (!props.auth.isLoggedIn) {
      router.history.push('/');
    }
  }

  /**
   * アプリタイトル変更
   */
  CustomAppNameForm() {
    return (
      <form>
        <Label mb={-3}>アプリ名</Label>
        <p>
          <Input bg='white' name="caption" type="text" placeholder="説明"
            value={this.state.form.appName} onChange={this.handleFormChange}/>
        </p>
        <Flex justify='center'>
          <Box w={1/2}>
            <p><Button w={1} onClick={this.handleSubmit}>変更</Button></p>
          </Box>
        </Flex>
      </form>
    );
  }

  render() {
    return (
      <div className="Post">
        <Flex justify='center'>
          <Box w={1/2}>
            <Border bottom mb={12}>
              <Heading is='h2' fontSize={12} color='gray8' mt={24}>設定</Heading>
            </Border>
          </Box>
        </Flex>
        <Flex justify='center'>
          <Box w={1/2}>
            {this.CustomAppNameForm()}
          </Box>
        </Flex>
      </div>
    );
  }
}

function select({ auth, config }) {
  return { auth, config };
}

export default connect(select)(Config);
