import React, { Component } from 'react'
import './App.css';
import Chart from './components/Chart';
import SearchAppBar from './components/material-ui/SearchAppBar';

import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div>
        <SearchAppBar />
        <h1>Let's dooooo this</h1>
        <Chart />
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    )
  }
}


export default App;
