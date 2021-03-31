import HomeComponent from './HomeComponent';
import React from 'react';
import { connect } from 'react-redux';

import { Action } from 'reducers';


class Home extends React.Component {
  saveChanges(newprofile) {
    this.props.updateUser(newprofile);
  }

  componentWillMount() {
    if (this.props.isAdmin) {
      return this.props.redirectHome();
    }
    if (this.props.authenticated) {
      this.props.fetchUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAdmin) {
      return nextProps.redirectHome();
    }
    if (nextProps.updated) {
      setTimeout(() => {
        this.props.updateDone();
      }, 1000);
    }
  }

  render() {
    return (
      <HomeComponent
      />
    );
  }
}

const mapStateToProps = (state) => {
  const profile = {
    name: ''
  };

  if (state.User.get('fetchSuccess')) {
    const User = state.User.get('profile');
    profile.name = `${User.firstName} ${User.lastName}`;
  }

  return {
    profile,
    fetchSuccess: state.User.get('fetchSuccess'),
    updated: state.User.get('updated'),
    updateSuccess: state.User.get('updateSuccess'),
    updateError: state.User.get('error'),
    authenticated: state.Auth.get('authenticated'),
    isAdmin: state.Auth.get('isAdmin'),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => {
    dispatch(Action.FetchUser());
  },
  updateUser: (newprofile) => {
    dispatch(Action.UpdateUser(newprofile));
  },
  updateDone: () => {
    dispatch(Action.UserUpdateDone());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);