import React, { Component } from 'react'
import './App.css';
import Chart from './components/Chart';
import Topic from './entities/Topic'
import Campaign from './entities/Campaign'
import Content from './entities/Content'

import SearchAppBar from './components/material-ui/SearchAppBar';
import Button from '@material-ui/core/Button';


class App extends Component {
  t1 = new Topic('first Topic');
  t2 = new Topic('second Topic');
  public topics: Array<Topic> = [
    this.t1,
    this.t2
  ];
  c1 = new Campaign('best Campaign', 'blue', 1592179200000, 1592438400000, this.t1);
  c2 = new Campaign('short Campaign','green', 1592611200000, 1592611200000, this.t2);
  c3 = new Campaign('i dont know', 'pink', 1592784000000, 1593475200000);
  public campaigns: Array<Campaign> = [
    this.c1,
    this.c2,
    this.c3
  ];
  public contents: Array<Content> = [
    new Content('beschde content', new Date().setUTCHours(0,0,0,0), this.c1),
    new Content('cool cool cool cool cool', 1593216000000, this.c2),
    new Content('no topic :(', 1593388800000, this.c3)
  ];
  state = {
    topics: this.topics,
    campaigns: this.campaigns,
    contents: this.contents
  };


  
  render() {
    return (
      <div>
        <SearchAppBar />
        <Chart topics={this.state.topics} campaigns={this.state.campaigns} contents={this.state.contents}/>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    )
  }
}


export default App;
