import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {
    flights;
    flightsRatio;
    query = '';
    series = [[this.fetchFlight]];

    constructor(AirportService) {
      'ngInject';
      this.name = 'searchCard';
      this.airport = AirportService;
    }

    $onInit() {
      console.log('request flight');
      this.flights = this.airport.getFlightDelays('SAN', 'DFW', this.query)
      this.flightsRatio = this.airport.getFlightDelayRatios('SAN', 'DFW', this.query)
    }

    fetchFlight() {
      this.flights = this.airport.getFlightDelays('SAN', 'DFW', this.query)
      this.flightsRatio = this.airport.getFlightDelayRatios('SAN', 'DFW', this.query)
    }

    searchData(query) {
      console.log('origin', query.origin);
      console.log('destination', query.destination);
    }
  }
};
