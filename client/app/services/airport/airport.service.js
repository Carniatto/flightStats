
import * as _ from 'lodash';
import moment from 'moment';

export class AirportService {
  parsedData;

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
    });
  }

  getFlightDelays(origin, dest) {
    return this.getModel()
      .then(
        data => {
          let initial = {
            'data': [],
            'labels': []
          };

          return _.chain(data)
            .filter({'ORIGIN': origin, 'DEST': dest})
            .filter(({ARR_DELAY}) => ARR_DELAY > 0)
            .map((flight) => {
              flight = this.roundTime(flight);
              return {
                'WEEK_DAY': moment(flight.FL_DATE, 'YYYY-MM-DD').format('ddd')+' - '+ flight.CRS_DEP_TIME,
                ...flight
              }
            })
            .groupBy('WEEK_DAY')
            .tap(x => console.log(x))
            .reduce( (acc, value, key) => {
              acc.data.push(value.length);
              acc.labels.push(key);
              return acc;
            }, initial)
            .value()
          }
      );
  }

  roundTime(data) {
    let hour = data.CRS_DEP_TIME.slice(0,2);
    let min = data.CRS_DEP_TIME.slice(2,4);
    let rounded = parseInt(hour) + (Math.round(parseInt(min)/60));
    console.log(data.CRS_DEP_TIME, rounded)
    debugger
    data.CRS_DEP_TIME = rounded;
    return data;
  }

}
