import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';

import styles from '../styles/Cards.module.css';

const Cards = ({ data }) => {
  const {
    confirmed,
    deaths,
    lastUpdate,
    newCases,
    newDeaths,
    newRecovered,
    recovered,
  } = data;

  const CasesCard = ({caption, heading, newCases, value, classList}) => {
    return (
      <Grid
          className={[styles.card, classList].join(' ')}
          component={Card}
          item
          md={3}
          xs={12}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant='caption'
            >
              {heading}
            </Typography>
            <Typography
              variant='h4'
            >
              {value.toLocaleString()}
            </Typography>
            <Typography
              className={styles.gutter}
              variant='subtitle2'
            >
              {`+${newCases.toLocaleString()}`}
            </Typography>
            <Typography
              className={styles.gutter}
              variant='caption'
            >
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography
              variant='body2'
            >
              {caption}
            </Typography>
          </CardContent>
        </Grid>
    );
  }

  if (!confirmed) {
    return (
      <div
        className={styles.loadingContainer}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Grid
        container
        justify='center'
        spacing={3}
      >
        <CasesCard
          caption='Number of confirmed cases'
          classList={styles.confirmed}
          heading='Total cases'
          newCases={newCases}
          value={confirmed}
        />
        <CasesCard
          caption='Number of recovered cases'
          classList={styles.recovered}
          heading='Recovered'
          newCases={newRecovered}
          value={recovered}
        />
        <CasesCard
          caption='Number of deaths'
          classList={styles.dead}
          heading='Deaths'
          newCases={newDeaths}
          value={deaths}
        />
      </Grid>
    </div>
  );
};

export default Cards;
