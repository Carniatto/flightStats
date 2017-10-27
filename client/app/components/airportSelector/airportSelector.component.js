import template from './airportSelector.html';
import './airportSelector.scss';
import './../../services/airport/airport.service';

export const AirportSelectorComponent = {
  bindings: {},
  template,
  controller: class AirportSelectorController {
    constructor() {
      'ngInject';
      // this.name = 'airportSelector';
      this.userOrigin = '';
      this.userDestination = '';

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
  }
};
