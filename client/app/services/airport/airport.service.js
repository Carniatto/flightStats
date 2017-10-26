
import * as _ from 'lodash';
import moment from 'moment';

export class AirportService {
  parsedData;
  fetchPromise;
  initial = {
    'data': [],
    'labels': []
  };

  constructor($http, $q) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
  }

  getModel() {
    let defer = this.$q.defer();
    defer.resolve(this.parsedData || this.fetchCsv());
    return defer.promise;
  }

  fetchCsv() {
    console.log('fetch called');
    return this.$http.get('../../assets/FlightDelays.csv')
      .then(
        res => {
          //success callback
          this.parsedData = this.parseCsv2Json(res.data);
          return this.parsedData;
        },
        err => {
          //error callback
          console.error(err);
        }
      );
  }

  parseCsv2Json(csv) {
    //parse into header and rows using deconstruct
    let [headers, ...rows] = csv.split('\n');
    headers = headers.split(',');

    //build and return a json object
    return rows.map(row => {
      return row.split(',').reduce((map, val, i) => {
        map[headers[i]] = val;
        return map;
      }, {});
    }).map((flight) => {
      let ratio = (flight.ARR_DELAY/flight.CRS_ELAPSED_TIME)*100;
      return {
        'WEEK_DAY': moment(flight.FL_DATE, 'YYYY-MM-DD').format('ddd'),
        'CRS_DEP_TIME_INT': this.roundTime(flight.CRS_DEP_TIME+''),
        'ARR_DELAY_BIN': Math.floor(flight.ARR_DELAY/10)*10,
        'DELAY_RATIO_BIN': Math.floor(ratio/10)*10,
        ...flight
      }
    });
  }

  filterflights(data, origin, dest, query) {
    return _.chain(data)
    .filter({'ORIGIN': origin, 'DEST': dest})
    .filter(({WEEK_DAY}) => {
      if(!query) return true;
      return (WEEK_DAY == query);
    }).value()
  }

  getFlightDelays(origin, dest, query) {
    // return this.getModel()
    //   .then(
    //     data => {
          return _.chain(this.parsedData)
            .filter({'ORIGIN': origin, 'DEST': dest})
            .groupBy('ARR_DELAY_BIN')
            // sorts by Arrival Delay
            .reduce( (acc, value, key) => {
              acc.push({'value': value.length, 'key': +key});
              return acc;
            }, [])
            .sortBy('key')
            // builds the series for plotting
            .reduce( (acc, item, key) => {
              acc.data.push(item.value)
              acc.labels.push(item.key);
              return acc;
            }, this.initial)
            .value()
      //     }
      // );
  }

  getFlightDelayRatios(origin, dest, query) {
    // return this.getModel()
    //   .then(
    //     data => {
          return _.chain(this.parsedData)
            .filter({'ORIGIN': origin, 'DEST': dest})
            .groupBy('DELAY_RATIO_BIN')
            // sorts by Delay Ratio
            .reduce( (acc, value, key) => {
              acc.push({'value': value.length, 'key': +key});
              return acc;
            }, [])
            .sortBy('key')
            // builds the series for plotting
            .reduce( (acc, item, key) => {
              acc.data.push(item.value)
              acc.labels.push(item.key+'%');
              return acc;
            }, this.initial)
            .value()
      //     }
      // );
  }

  roundTime(time) {
    let hour = time.slice(0,2);
    let min = time.slice(2,4);
    hour = (parseInt(hour) + (Math.round(parseInt(min)/60)))%24;
    min = (Math.round(parseInt(min)/30) * 30)%60;
    min = min < 10 ? `0${min}` : `${min}`;
    return `${hour}${min}`;
  }

}
