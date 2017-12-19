import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PanelFooter } from 'rebass';

/**
 * Footerを表示するコンポーネント
 * (使ってない)
 */
class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <PanelFooter>
          hoge
        </PanelFooter>
      </div>
    );
  }
}

export default Footer;
