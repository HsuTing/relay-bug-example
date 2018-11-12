import React from 'react';
import PropTypes from 'prop-types';
import { fetchQuery, graphql } from 'react-relay';

export default class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
  };

  static query = graphql`
    query pages_userQuery {
      user {
        isLogin
      }
    }
  `;

  login = async e => {
    e.preventDefault();

    const { environment } = this.props;

    await fetch('/login');
    await fetchQuery(environment, Index.query);
  };

  render() {
    const {
      user: { isLogin },
    } = this.props;

    return (
      <div>
        {isLogin
          ? 'Hi!'
          : (
            <button onClick={this.login}>
              login
            </button>
          )}
      </div>
    );
  }
}
