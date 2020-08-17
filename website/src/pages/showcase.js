/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
import Layout from '@theme/Layout';

const docusaurusConfig = require('../../docusaurus.config.js');

const showcaseApps = docusaurusConfig.customFields.users;
const pinnedApps = showcaseApps.filter(app => {
  return app.pinned;
});
const featuredApps = showcaseApps
  .filter(app => {
    return !app.pinned;
  })
  .sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
const apps = pinnedApps.concat(featuredApps);

class AppList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._renderApp = this._renderApp.bind(this);
    this._renderAppIcon = this._renderAppIcon.bind(this);
    this._renderAppName = this._renderAppName.bind(this);
    this._renderInfo = this._renderInfo.bind(this);
    this._renderLinks = this._renderLinks.bind(this);
  }

  render() {
    return <div>{this.props.apps.map(this._renderApp)}</div>;
  }

  _renderApp(app, i) {
    return (
      <div className="showcase" key={i}>
        <div>
          <a href={app.infoLink}>{this._renderAppIcon(app)}</a>
          {this._renderAppName(app.name)}
          {this._renderLinks(app)}
          {this._renderInfo(app.infoTitle, app.infoLink)}
        </div>
      </div>
    );
  }

  _renderAppIcon(app) {
    let imgSource = app.icon;
    if (!app.icon.startsWith('http')) {
      imgSource = docusaurusConfig.baseUrl + 'img/showcase/' + app.icon;
    }
    return <img src={imgSource} alt={app.name} />;
  }

  _renderAppName(name) {
    return <h3>{name}</h3>;
  }

  _renderInfo(title, uri) {
    let info = null;
    if (uri) {
      info = (
        <p>
          <a href={uri} target="_blank">
            {title}
          </a>
        </p>
      );
    }

    return info;
  }

  _renderLinks(app) {
    if (!app.linkAppStore && !app.linkPlayStore) {
      return;
    }

    var linkAppStore = app.linkAppStore ? (
      <a href={app.linkAppStore} target="_blank">
        iOS
      </a>
    ) : (
      ''
    );
    var linkPlayStore = app.linkPlayStore ? (
      <a href={app.linkPlayStore} target="_blank">
        Android
      </a>
    ) : (
      ''
    );

    return (
      <p>
        {linkPlayStore}
        {linkPlayStore && linkAppStore ? ' · ' : ''}
        {linkAppStore}
      </p>
    );
  }
}

class Showcase extends React.Component {
  render() {
    return (
      <Layout>
        <div className="pageContainer">
          <div className="container margin-vert--lg">
            <div className="showcaseSection">
              <div className="showcaseHeader">
                <h1>Who's using React Native?</h1>
                <p>
                  Thousands of apps are using React Native, from established
                  Fortune 500 companies to hot new startups. If you're curious
                  to see what can be accomplished with React Native, check out
                  these apps!
                </p>
              </div>
              <div className="logos">
                <AppList apps={apps} />
              </div>
              <p>
                <a href="https://forms.gle/BdNf3v5hemV9D5c86">
                  Fill out this form to apply to the customer spotlight.
                </a>
              </p>
              <p>
                A curated list of{' '}
                <a href="https://github.com/ReactNativeNews/React-Native-Apps">
                  open source React Native apps
                </a>{' '}
                is also being kept by{' '}
                <a href="https://infinite.red/">Infinite Red</a>.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Showcase.defaultProps = {
  language: 'en',
};

export default Showcase;