import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import styles from '../styles/Chart.module.css';

const Chart = ({ data }) => {
  const [timelineData, setTimelineData] = useState(data);

  useEffect(() => {
    setTimelineData(data);
  }, [data]);

  const LineChart = () =>
    timelineData.length > 1 ? (
      <Line
        data={{
          labels: timelineData.map(dailyData => dailyData.date),
          datasets: [
            {
              borderColor: '#ee6f57',
              data: timelineData.map(dailyData => dailyData.newCases),
              fill: true,
              label: 'New confirmed',
            },
            {
              borderColor: 'rgba(0, 255, 0, 0.4)',
              data: timelineData.map(dailyData => dailyData.newRecovered),
              fill: true,
              label: 'New recovered',
            },
            {
              borderColor: 'rgba(255, 0, 0, 0.5)',
              data: timelineData.map(dailyData => dailyData.newDeaths),
              fill: true,
              label: 'New deaths',
            },
          ],
        }}
      />
    ) : null;

  const handleChange = (e) => {
    let daysLimit = e.target.value;

    if (daysLimit) {
      setTimelineData(data.slice(-daysLimit));
    } else {
      setTimelineData(data);
    }
  }

  return (
    <div className={styles.container}>
      {
        timelineData.length > 1 &&
        <FormControl
          className={styles.daysLimitContainer}
          variant='filled'
        >
          <Select
            className={styles.daysLimit}
            defaultValue=''
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem
              value=''
            >
              All time
            </MenuItem>
            <MenuItem
              value={7}
            >
              1 week
            </MenuItem>
            <MenuItem
              value={14}
            >
              2 weeks
            </MenuItem>
            <MenuItem
              value={30}
            >
              30 days
            </MenuItem>
          </Select>
        </FormControl>
      }
      <LineChart />
    </div>
  );
};

export default Chart;
