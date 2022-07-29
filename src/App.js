
import './App.css';

import React, { Component } from 'react'

import Navbar from './components/Navbar'
// import NewsItem from './components/NewsItem';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'





 class App extends Component {
   state={
     progress:0
   }
   setprogress=(progress)=>{
     this.setState({progress:progress})
   }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Switch>
          <Route exact path="/general"> <News setprogress={this.setprogress}  key="general" pageSize={6} country="in" category="general"/></Route>
          <Route exact path="/business"> <News setprogress={this.setprogress}  key="business" pageSize={6} country="in" category="business"/></Route>
          <Route exact path="/entertainment"> <News setprogress={this.setprogress}  key="entertainment" pageSize={6} country="in" category="entertainment"/></Route>
          <Route exact path="/general"> <News setprogress={this.setprogress}  key="general" pageSize={6} country="in" category="general"/></Route>
          <Route exact path="/health"> <News setprogress={this.setprogress}  key="health" pageSize={6} country="in" category="health"/></Route>
          <Route exact path="/science"> <News setprogress={this.setprogress}  key="science" pageSize={6} country="in" category="science"/></Route>
          <Route exact path="/sports"> <News setprogress={this.setprogress}  key="sports" pageSize={6} country="in" category="sports"/></Route>
          <Route exact path="/technology"> <News setprogress={this.setprogress}  key="technology" pageSize={6} country="in" category="technology"/></Route>

          
        </Switch>
        
       
        </Router>
      </div>
    )
  }
}


export default App;
