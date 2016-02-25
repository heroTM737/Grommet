import React, { Component } from 'react';

import FolderOpen from 'grommet/components/icons/base/FolderOpen';
import Folder from 'grommet/components/icons/base/Folder';
import Article from 'grommet/components/icons/base/Article';

import SocialFacebook from 'grommet/components/icons/base/SocialFacebook';
import SocialTwitter from 'grommet/components/icons/base/SocialTwitter';
import SocialLinkedin from 'grommet/components/icons/base/SocialLinkedin';
import SocialTumblr from 'grommet/components/icons/base/SocialTumblr';


export default class GrommetIconTab extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className="GrommetIconTab">
        <div className="social-icon">
          <span>Social</span>
          <SocialFacebook />
          <SocialTwitter />
          <SocialLinkedin />
          <SocialTumblr />
        </div>
        <div className="tree-icon">
          <span>Tree Icon</span>
          <Folder />
          <FolderOpen />
          <Article />
        </div>
      </div>
    );
  }
};
