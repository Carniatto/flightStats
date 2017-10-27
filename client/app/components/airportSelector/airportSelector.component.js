import template from './airportSelector.html';
import './airportSelector.scss';
import './../../services/airport/airport.service';

export const AirportSelectorComponent = {
  bindings: {
    onSearch: '&'
  },
  template,
  controller: class AirportSelectorController {
    constructor(AirportService) {
      'ngInject';

      this.originAirport = '';
      this.destinationAirport = '';

      this.airports = [
        {'name': 'airport a', 'code': 'AA'},
        {'name': 'airport b', 'code': 'AB'},
        {'name': 'airport c', 'code': 'AC'},
        {'name': 'airport d', 'code': 'AD'},
        {'name': 'airport e', 'code': 'AE'},
        {'name': 'airport f', 'code': 'AF'},
        {'name': 'airport g', 'code': 'AG'},
        {'name': 'airport h', 'code': 'AH'}
      ];
    }

    search() {
      console.log('firing event!', this.originAirport, this.destinationAirport);
      this.onSearch({
        $event: {
          origin: this.originAirport,
          destination: this.destinationAirport
        },
      });
    }
  }
};
