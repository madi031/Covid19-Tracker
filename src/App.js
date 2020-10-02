import {
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Component } from 'react';

import Cards from './components/Cards';
import Chart from './components/Chart';
import CountryPicker from './components/CountryPicker';

import { fetchCountryTimeline, fetchGlobalTimeline } from './api';

import styles from './App.module.css';

import 'fontsource-roboto';

export default class App extends Component {
  // defining state like this instead of inside constructor
  // because this will internally initializes the constructor
  state = {
    data: [{}],
    open: true,
  };

  async componentDidMount() {
    let globalData = await fetchGlobalTimeline();
    
    this.setState({
      data: globalData,
    });
  }

  handleCountryChange = countryCode => {
    const fetchCountrySpecificData = async (code) => {
      let data;

      this.setState({
        data: [{}],
      });

      if (!code) {
        data = await fetchGlobalTimeline();
      } else {
        data = await fetchCountryTimeline(code);
      }

      this.setState({ data });
    }

    fetchCountrySpecificData(countryCode);
  }

  renderCovidData = () => {
    let { data, open } = this.state;

    if (data.error) {
      return (
        <Snackbar
          autoHideDuration={5000}
          open={open}
          onClose={() => this.setState({ open: false })}
        >
          <Alert
            elevation={6}
            severity='error'
            variant='filled'
          >
            Some error occured. Try reloading the page.
          </Alert>
        </Snackbar>
      );
    }

    return (
      <>
        <Cards
          data={data[0]}
        />
        <Chart
          data={data.reverse()}
        />
      </>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Typography
          align='center'
          className={styles.heading}
          variant='h3'
        >
          COVID-19 Statistics
        </Typography>
        <CountryPicker
          handleCountryChange={this.handleCountryChange}
        />
        {
          this.renderCovidData()
        }
      </div>
    );
  }
}
