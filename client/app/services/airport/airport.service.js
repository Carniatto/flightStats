import * as _ from 'lodash';
import moment from 'moment';

export class AirportService {
  parsedData;
  airports;

  initial = {
    'data': [],
    'labels': []
  };

  constructor($http, $q) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
  }

  /*
  * This method fetch:
  * - FlightDelays.csv: flight data from CA airports
  * - airports-usa.json: airport codes and names
  * This method also prepares these data to be used
  * @return { Promise } promise to be resolved once files are fetched and parsed
  * */
  fetchFiles() {
    console.log('fetch called');
    console.time('fetch files');
    if(this.parsedData && this.airports) {
      return this.$q.resolve();
    }
    return this.$q.all([
      this.$http.get('assets/FlightDelays.csv'),
      this.$http.get('assets/airports-usa.json')
    ]).then(
      ([flightCsv, airportsJson]) => {
        console.timeEnd('fetch files');
        console.time('parse csv');
        this.parsedData = this.parseCsv2Json(flightCsv.data);
        console.timeEnd('parse csv');
        console.time('parse json');
        this.airports = this.parseAirportJson(airportsJson.data);
        console.timeEnd('parse json');

      }
    )
  }

  /*
  * Parses the csv into json
  *
  * @param { String } csv string in csv format with flights data
  * @return { Array } flights data
  * */
  parseCsv2Json(csv) {
    //parse into header and rows using deconstruct
    let [headers, ...rows] = csv.split('\n');
    headers = headers.split(',');

    console.time('parse csv');
    //build and return a json object
    return rows.map(row => {
      return row.split(',').reduce((map, val, i) => {
        map[headers[i]] = val;
        return map;
      }, {});
    });
  }

  /*
  * Picks into json to retrieve only:
  * - iata: airport code
  * - name: airport name
  *
  * @param { Array } json array of all airports data
  * @return { Array } reduced json
  * */
  parseAirportJson(json) {
    return json.map(
      airport => ({
        'code': airport.iata,
        'name': airport.name,
      })
    )
  }


  /*
  * Retrieves the airports based on origin or destination
  * if airport is omitted returns all airports
  *
  * @param { Object } type selector for origin or destination
  * @param { String } airport code to airport (origin or destination)
  * @return { Array } airports listing
  * */
  getAirports(type, airport) {
    let froms = this.parsedData
      .filter(flight => {
        if (airport) {
          return (flight[type.from] == airport)
        }
        return true;
      })
      .map( flight => flight[type.to]);

    return _.chain(froms)
      .uniq()
      .map( airCode => {
        return _.find(this.airports, air => {
          return (air.code == airCode)
        })
      })
      .sortBy('name')
      .value()
  }

  /*
  * Builds the graph data
  *
  * @param { String } origin code for origin airport
  * @param { String } dest code for destination airport
  * @param { Object } group selector between DELAY or DELAY RATIO
  * @return { Array } returns two data arrays data and labels
  * */
  getHistogramData(origin, dest, group) {
    return _.chain(this.parsedData)
      // selects only late arrivals
      .filter(flight => flight.ARR_DELAY > 0)
      .filter({'ORIGIN': origin, 'DEST': dest})
      .map(this.calcAdditionalParams.bind(this))
      .groupBy(group)
      // sorts by Arrival Delay
      .reduce( (acc, value, key) => {
        acc.push({'value': value.length, 'group': +key});
        return acc;
      }, [])
      .sortBy('group')
      // builds the series for histogram
      .reduce( (acc, item) => {
        acc.data.push(item.value);
        acc.labels.push(`${item.group} - ${item.group+10}`);
        return acc;
      }, _.cloneDeep(this.initial))
      .value();
  }

  /*
  * Builds the graph data
  *
  * @param { String } origin code for origin airport
  * @param { String } dest code for destination airport
  * @param { Object } group selector between DELAY or DELAY RATIO
  * @return { Array } returns two data arrays data and labels
  * */
  getGraphData(origin, dest, group) {
    return _.chain(this.parsedData)
      .filter({'ORIGIN': origin, 'DEST': dest})
      .map(this.calcAdditionalParams.bind(this))
      .groupBy('FL_DATE')
      .map( (flights, date) => {
        let delay = flights.reduce( (acc, flight) => {
          return acc + parseFloat(flight[group])
        }, 0) / flights.length;
        return {date, delay, flights}
      })
      .reduce( (acc, item) => {
        acc.data.push(item.delay);
        acc.labels.push(item.date);
        return acc;
      }, _.cloneDeep(this.initial))
      .tap( x => console.log(x))
      .value();
  }

  /*
  * Calculates the overall ratio (delay/elapsed time)
  * for desired airports
  *
  * @param { String } origin code for origin airport
  * @param { String } dest code for destination airport
  * @return { Array } overall ratio (%)
  * */
  getOverallRatio(origin, dest) {
    let length;
    let sum = _.chain(this.parsedData)
      .filter({'ORIGIN': origin, 'DEST': dest})
      .map(this.calcAdditionalParams.bind(this))
      .tap( set => length = set.length)
      .reduce( (acc, item) => acc + item.DELAY_RATIO, 0)
      .value();

    return sum/length;
  }

  /*
  * Calculates the overall ratio (delay/elapsed time)
  * for desired airports
  *
  * @param { String } origin code for origin airport
  * @param { String } dest code for destination airport
  * @return { Array } overall ratio (%)
  * */
  getBestDayAndTime(origin, dest) {
    let flights = _.chain(this.parsedData)
      .filter({'ORIGIN': origin, 'DEST': dest})
      .map(this.calcAdditionalParams.bind(this))
      .groupBy('FL_DATE')
      .map( (flights, date) => {
        let delay = flights.reduce( (acc, flight) => {
          return acc + parseFloat(flight.ARR_DELAY)
        }, 0) / flights.length;
        return {date, delay, flights}
      })
      .value();

    let bestDay = _.minBy(flights, 'delay');
    let bestTime = _.minBy(bestDay.flights, 'ARR_DELAY');
    console.log(bestDay.date, bestTime.CRS_DEP_TIME_INT);
    return {day: bestDay.date, time: bestTime.CRS_DEP_TIME_INT};
  }

  // utility functions //

  /*
  * Utility functions to Round time in half hours
  *
  * @param { String } time time of departure
  * @return { String } rounded time
  * */
  roundTime(time) {
    let hour = time.slice(0,2);
    let min = time.slice(2,4);
    hour = (parseInt(hour) + (Math.round(parseInt(min)/60)))%24;
    min = (Math.round(parseInt(min)/30) * 30)%60;
    min = min < 10 ? `0${min}` : `${min}`;
    return `${hour}:${min}`;
  }

  /*
  * Utility functions to calculate additional parameters
  * to be used in graph plotting
  *
  * @param { Array } flight flights data
  * @return { Array } reduced flights data
  * */
  calcAdditionalParams(flight) {
      let ratio = (flight.ARR_DELAY/flight.CRS_ELAPSED_TIME)*100;
      return {
        ...flight,
        'ARR_DELAY': flight.ARR_DELAY == '' ? 0 : flight.ARR_DELAY,
        'WEEK_DAY': moment(flight.FL_DATE, 'YYYY-MM-DD').format('ddd'),
        'CRS_DEP_TIME_INT': this.roundTime(flight.CRS_DEP_TIME+''),
        'ARR_DELAY_BIN': Math.floor(flight.ARR_DELAY/10)*10,
        'DELAY_RATIO': ratio,
        'DELAY_RATIO_BIN': Math.floor(ratio/10)*10,

    }
  }

}
