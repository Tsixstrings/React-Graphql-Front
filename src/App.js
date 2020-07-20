import React from 'react';
import Tabla from './components/Tabla';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import './App.css';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C7CED0",
    minHeight: "100vh"
  },
  table: {
    paddingTop: "5rem",
  },
  logo: {
    height: "3rem"
  },
  slider:{
    height: "100vh"
  },
  nav: {
    marginTop: "2rem"
  },
  contentContainer:{
    marginBottom: "3rem"
  }
});

function App(props) {
  const classes = useStyles();


  return (
    <Router>
      <Grid container className={classes.root}>
        <Grid item xs={2} />
        <Grid item xs={8} alignItems="center" justify="center">
          <nav className={classes.nav}>
          <Link style={{ textDecoration: 'none' }} to="/"><img className={classes.logo} src="assets/images/sw_logo.png" alt="star wars logo" /></Link>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Link style={{ textDecoration: 'none' }} to="/"><Button variant="text" color="default">Home</Button></Link>
              <Link style={{ textDecoration: 'none' }} to="/lister_page"><Button variant="text" color="default">Lister Page</Button></Link>
              {/* <Button  variant="text" color="primary">Three</Button> */}
            </ButtonGroup>
          </nav>
          <div className={classes.contentContainer}>
          <Switch>
            <Route path="/lister_page">
              <Tabla />
            </Route>
            {/* <Route path="/users">
            <Users />
          </Route> */}
            <Route path="/">
              <AwesomeSlider className={classes.slider}>
                <div data-src="assets/images/wallpaper1.jpg" />
                <div data-src="assets/images/wallpaper2.jpg" />
                <div data-src="assets/images/wallpaper3.jpg" />
              </AwesomeSlider>
            </Route>
          </Switch>
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Router>
  );
}

export default App;