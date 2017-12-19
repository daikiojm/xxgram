import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Panel, PanelHeader, Box, PanelFooter, Flex, Small, Text, Input, ButtonOutline, Circle } from 'rebass';
import Moment from 'react-moment';
import 'moment-timezone';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import { fetchFeed } from './../actions/feed';
import { createComment } from './../actions/comment';
import { createLike, deleteLike } from './../actions/like';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        payload: []
      }
    };

    this.GUEST_USER_NAME = 'GuestUser';

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchFeed({}));
  }

  /**
   * Input(text)要素のイベントハンドラ
   * 入力の変更があるたびに発火
   */
  handleFormChange(index, e) {
    let data = this.state.form;
    data.payload[index] = e.target.value;
    this.setState({form: data});
  }

  /**
   * Formを送信のイベントハンドラ
   */
  handleSubmit(index, postId, e) {
    const { auth } = this.props;
    e.preventDefault();
    let data = this.state.form;
    const username = auth.user.username || this.GUEST_USER_NAME;
    const payload = data.payload[index];

    this.fetchComment(postId, username, payload);

    data.payload[index] = '';
    this.setState({form: data});
  }

  /**
   * Likeのイベントハンドラ
   * (ココらへんも冗長)
   */
  handleLikes(postId, e) {
    const { auth } = this.props;
    
    if (!auth.isLoggedIn) {
      return;
    }

    this.props.dispatch(createLike({
      post_id: postId,
      username: auth.user.username
    }));
  }

  /**
   * Like取り消しのイベントハンドラ
   */
  handleUnlikes(postId, e) {
    const { auth } = this.props;

    if (!auth.isLoggedIn) {
      return;
    }

    this.props.dispatch(deleteLike({
      post_id: postId,
      username: auth.user.username
    }));
  }

  /**
   * fetchじゃないけどfetchです...
   */
  fetchComment(postId, username, payload) {
    this.props.dispatch(createComment({
      post_id: postId,
      username: username,
      payload:payload 
    }));
  }

  /**
   * ポストを表示するコンポーネント
   * あとでファイル分けたい
   */
  PostItem() {
    const { auth, feed } = this.props;
    const baseImageUrl = '/images/userdata'
    return feed.posts.map((post, i) => {
      return (
        <div key={i}>
        <Panel color='gray' bg='white' my={12}>
          <PanelHeader color='gray'>
            <Flex>
              {/* iconっぽいものを表示する */}
              <Circle bg='gray4'>{post.username.substring(0, 1)}</Circle>
              <Text color='gray8'>{post.username}</Text>
            </Flex>
          </PanelHeader>
            <Flex justify='center'>
              <Box>
                <Image width={500} height={500} src={`${baseImageUrl}/${post.photos[0].id}.${post.photos[0].ext}`} /> 
              </Box>
            </Flex>
          <PanelFooter color='gray'>
            {this.Like(post)}
            <Text color='gray8' mt={1}>{post.caption}</Text>
            <Text left fontSize={0.8} color='gray'>
              <Moment format="YYYY/MM/DD HH:mm">
                {post.created_time}
              </Moment>
            </Text>
          </PanelFooter>
          {post.comments.length > 0 &&
            <PanelFooter color='gray'>
              {this.Comment(post.comments)}
            </PanelFooter>
          }
          <PanelFooter color='gray'>
            {auth.isLoggedIn && this.CommentInput(i, post.id)}
            {!auth.isLoggedIn && <Text color='gray8'>コメントをするにはログインが必要です。</Text>}
          </PanelFooter>
        </Panel>
        </div>
      );
    });
  }

  /**
   * いいねを表示するコンポーネント
   * (この単位のコンポーネントは関数にするべきか別クラスに切り出すべきか)
   */
  Like(post) {
    const { auth } = this.props;
    return (
      <div>
        <Flex>
          {/* ↓なんか冗長な気がする */}
          {post.likes.indexOf(auth.user.username) === -1 && <FaHeartO size={20} onClick={this.handleLikes.bind(this, post.id)} />}
          {post.likes.indexOf(auth.user.username) >= 0 && <FaHeart color='tomato' size={20} onClick={this.handleUnlikes.bind(this, post.id)} />}
          {post.likes.length > 0 && <Text ml={2}>{post.likes.length}件のいいね</Text>}
        </Flex>
      </div>
    );
  }

  /**
   * コメント表示するコンポーネント
   * (この単位のコンポーネントは関数にするべきか別クラスに切り出すべきか)
   */
  Comment(comments) {
    return comments.map((comment, i) => {
      return (
        <div key={i}>
          <Flex mx={2} my={1}>
            <Small bold color='gray8'>{comment.username}</Small><Small color='gray' ml={1}>{comment.payload}</Small>
          </Flex>
        </div>
      );
    })
  }

  /**
   * コメント入力するコンポーネント
   * (この単位のコンポーネントは関数にするべきか別クラスに切り出すべきか)
   */
  CommentInput(index, postId) {
    return (
      <div>
        <form>
          <Flex>
            <Input w={4/5} placeholder='コメントを入力' color='gray8'
              onChange={this.handleFormChange.bind(this, index)}
              value={this.state.form.payload[index] || ''} />
            <ButtonOutline onClick={this.handleSubmit.bind(this, index, postId)}
              color='gray' w={1/5} fontSize={0.5} children='送信' />
          </Flex>
        </form>
      </div>
    );
  }

  /**
   * 投稿を取得
   */
  render() {
    return (
      <div className="Home">
        <Flex justify='center' my={12}>
        {/* 全体をレスポンシブ対応 */}
          <Box px={2} w={[1, 1/2]}>
            {this.PostItem()}
          </Box>
        </Flex>
      </div>
    );
  }
}

function select({ auth, feed }) {
  return { auth, feed };
}

export default connect(select)(Home);
