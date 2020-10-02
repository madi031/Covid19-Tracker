import {
  FormControl,
  Select,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState} from 'react';

import { fetchCountries } from '../api';

import styles from '../styles/CountryPicker.module.css';

const CountryPicker = props => {
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchCountryNames = async () => {
      setCountries(await fetchCountries());
    }

    fetchCountryNames();
  }, []);

  const handleChange = (e) => {
    props.handleCountryChange(e.target.value);
  }

  if (countries === -1) {
    return (
      <Snackbar
        autoHideDuration={10000}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Alert
          elevation={6}
          severity='warning'
          variant='filled'
        >
          Some error occured while retrieving country names. Try reloading the page.
        </Alert>
      </Snackbar>
    );
  }

  return (
    <FormControl
      className={styles.container}
      variant='outlined'
    >
      <Select
        className={styles.country}
        defaultValue=''
        native
        onChange={handleChange}
      >
        <option
          value=''
        >
          Worldwide
        </option>
        {
          countries.map((country, index) => (
            <option
              key={index}
              value={country.code}
            >
              {country.name}
            </option>
          ))
        }
      </Select>
    </FormControl>
  );
}

export default CountryPicker;
