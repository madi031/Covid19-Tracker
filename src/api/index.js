import axios from 'axios';

export const fetchCountries = async () => {
  let url = 'https://covid19.mathdro.id/api/countries';

  try {
    let {
      data: { countries },
    } = await axios.get(url);

    let formattedData = countries.map(country => ({
      name: country.name,
      code: country.iso2,
    }));

    return formattedData;
  } catch (error) {
    console.log('Error occured: ', error);
    return -1;
  }
};

export const fetchCountryTimeline = async countryCode => {
  let url = `https://corona-api.com/countries/${countryCode}`;

  try {
    let {
      data: {
        data: { timeline },
      },
    } = await axios.get(url);

    let formattedData = timeline.map(dailyData => ({
      confirmed: dailyData.confirmed,
      date: dailyData.date,
      deaths: dailyData.deaths,
      lastUpdate: dailyData['updated_at'],
      newCases: dailyData['new_confirmed'],
      newDeaths: dailyData['new_deaths'],
      newRecovered: dailyData['new_recovered'],
      recovered: dailyData.recovered,
    }));

    return formattedData;
  } catch (error) {
    console.log('Error occured: ', error);
    return {
      error: true,
    };
  }
};

export const fetchGlobalTimeline = async () => {
  let url = `https://corona-api.com/timeline`;

  try {
    let {
      data: { data },
    } = await axios.get(url);

    let formattedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed,
      date: dailyData.date,
      deaths: dailyData.deaths,
      lastUpdate: dailyData['updated_at'],
      newCases: dailyData['new_confirmed'],
      newDeaths: dailyData['new_deaths'],
      newRecovered: dailyData['new_recovered'],
      recovered: dailyData.recovered,
    }));

    return formattedData;
  } catch (error) {
    console.log('Error occured: ', error);
    return {
      error: true,
    };
  }
};
