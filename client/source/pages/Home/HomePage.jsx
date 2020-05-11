import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../Home/views/Home';
import { dispatchFoo } from '../../actions/foo.actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {};
  handleFooClick = () => {
    this.props.dispatchFoo();
  };
  render() {
    return (
      <div>
        <Home {...this.props} />
        {/* <button onClick={this.handleFooClick}>click me</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    foo: state.foo,
  };
};

export default connect(mapStateToProps, {
  dispatchFoo,
})(HomePage);
