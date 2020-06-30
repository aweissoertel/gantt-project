import React, { Component } from 'react'
import './App.css';
import Chart from './components/Chart';

import SearchAppBar from './components/material-ui/SearchAppBar';


class App extends Component {
  render() {
    return (
      <div>
        <SearchAppBar />
        <Chart />
      </div>
    )
  }
}


export default App;
