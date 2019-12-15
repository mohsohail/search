import React from 'react';
import { renderRoutes } from 'react-router-config';
import Routes from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: 'no timeStamp yet'
    };
  }
  render() {
    return <div>{renderRoutes(Routes)}</div>;
  }
}

export default App;
