import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Textarea, Button, Border, Container, Heading, Image, Text, Label, Flex, Box } from 'rebass';
import CameraRetro from 'react-icons/lib/fa/camera-retro'

class Post extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      imageSrc: '',
      imageUrl: '',
      form: {
        caption: '',
      }
    }

    this.GUEST_USER_NAME = 'GuestUser';

    this.handleChangeFile = this.handleChangeFile.bind(this);
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
   * Input(file)要素のイベントハンドラ
   * ファイル選択が完了した際に発火
   */
  handleChangeFile(e) {
    const files = e.target.files;
    this.setState({file: files[0]})

    const reader = new FileReader();
    reader.onload =(event) => {
      const localImage = event.target.result;
      this.setState({imageSrc: localImage});
    }
    reader.readAsDataURL(files[0]);
  }

  /**
   * Input(text)要素のイベントハンドラ
   * 入力の変更があるたびに発火
   */
  handleFormChange(e) {
    let data = this.state.form;
    data.caption = e.target.value;
    this.setState({form: data});
  }

  /**
   * 投稿ボタン押下時のイベントハンドラ
   */
  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', this.state.file);
    const method = 'POST';

    // 画像をアップロード
    fetch('/api/photo/upload', {method: method, body: formData})
      .then(res => res.json())
      .then(json => {
        const postObject = {
          photos: [
            json
          ],
          username: this.props.auth.user.username || this.GUEST_USER_NAME,
          caption: this.state.form.caption,
        };
        const body = JSON.stringify(postObject);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };

        // キャプションを投稿
        fetch('/api/post', {method, headers, body})
          .then(res => res.json())
          .then(json => {
            this.setState({
              file: '',
              imageSrc: '',
              imageUrl: '',
              form: {
                caption: '',
              }
            })
          })
          .catch(err => console.log);
      })
      .catch(err => console.log);
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
   * 画像未選択時にカメラアイコンを表示する関数コンポーネント
   */
  CameraIcon() {
    return (
      <Container width={1}>
        <label htmlFor="fileInput">
          <Container width={120} mx='auto' px='auto'>
            <CameraRetro size={120}/>
          </Container>
          <Text center>写真を選択</Text>
          {/* 暫定 */}
          <input type="file" id="fileInput" ref="file" onChange={this.handleChangeFile} />
        </label>
      </Container>
    );
  }

  /**
   * 画像選択時にプレビュー表示する関数コンポーネント
   */
  ImagePreview() {
    return (
      <Container width={1}>
        <Image width={250} mx='auto' px='auto' src={this.state.imageSrc} />
      </Container>
    );
  }

  /**
   * 画像に対するキャプション
   */
  ImageCaptionForm() {
    return (
      <form>
        <Label mb={-3}>説明</Label>
        <p>
          <Textarea bg='white' name="caption" type="text" placeholder="説明"
            value={this.state.form.caption} onChange={this.handleFormChange}/>
        </p>
        <Flex justify='center'>
          <Box w={1/2}>
            <p><Button w={1} onClick={this.handleSubmit}>投稿</Button></p>
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
              <Heading is='h2' fontSize={12} color='gray8' mt={24}>投稿</Heading>
            </Border>
          </Box>
        </Flex>
        <Flex justify='center'>
          <Box w={1/3}>
          {!this.state.imageSrc && this.CameraIcon()}
          {this.state.imageSrc && this.ImagePreview()}
          </Box>
        </Flex>
        <Flex justify='center'>
          <Box w={1/2}>
            <Border bottom mt={24} mb={12}>
            </Border>
            {this.ImageCaptionForm()}
          </Box>
        </Flex>
      </div>
    );
  }
}

function select({ auth }) {
  return { auth };
}

export default connect(select)(Post);
