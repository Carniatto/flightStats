import * as _ from 'lodash';

export class AirportService {
    parsedData = {};

    constructor($http) {
        'ngInject';
        console.log(_);
        this.$http = $http;
    }

    fetchCsv() {
        console.time('fetch')
        this.$http.get('../../assets/FlightDelays.csv')
            .then( res => {
                console.timeEnd('fetch');
                this.parsedData = this.parseCSV(res.data);
                return this.parseData;
            });
    }

    parseCsv2Json(csv) {
        console.time('parse');

        //parse into header and rows using deconstruct
        let [headers, ...rows] = csv.split('\n');
        headers = headers.split(',');

        //build and return a json object
        return rows.map( row => {
            return row.split(',').reduce((map, val, i) => {
                map[headers[i]] = val;
                return map;
            }, {})
        })
    }

}