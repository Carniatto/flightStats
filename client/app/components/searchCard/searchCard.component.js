import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {
    flights;
    series = ['flights', 'batima']

    constructor(AirportService) {
      'ngInject';
      this.name = 'searchCard';
      this.airport = AirportService;
    }

    $onInit() {
      this.airport.getFlightDelays('SAN', 'DFW')
        .then(res => {
            console.log('filtered result: ', res)
            this.flights = res;
        });
    }
  }
};
