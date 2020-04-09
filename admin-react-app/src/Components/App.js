import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Requested from '../Components/Requested';
import Rejected from '../Components/Rejected';
import Accepted from '../Components/Accepted';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { receive_schools_data, loadData } from '../Actions/actions'


class App extends Component {

  componentDidMount() {
    this.props.loadData();
  }


  render() {

    return (

      <div className="App">
        <Grid container>

          <Router>

            <Grid item xs={12} md={2} className='sidebar'>
              <Sidebar />
            </Grid>

            <Grid item xs={12} md={10} className='content'>

              <Header />
              <Navbar />

              <Switch>
                <Route exact path="/" component={Requested}></Route>
                <Route path="/accepted" component={Accepted}></Route>
                <Route path="/rejected" component={Rejected}></Route>
              </Switch>

              <Footer />

            </Grid>

          </Router>

        </Grid>

      </div>
    )


  }


}

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadData()),
  recieve_data: () => dispatch(receive_schools_data)
});

export default connect(null, mapDispatchToProps)(App);
