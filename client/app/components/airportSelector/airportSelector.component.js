import { AIRPORT_TYPE } from '../../services/airport/airport.constants';

import template from './airportSelector.html';
import './airportSelector.scss';

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
      this.airService = AirportService;

      this.allOrigins = this.airService.getAirports(AIRPORT_TYPE.ORIGIN);
      this.allDestinations = this.airService.getAirports(AIRPORT_TYPE.DEST);
    }

    /*
    * emits a search event passign the query params
    *
    * */
    search() {
      this.onSearch({
        $event: {
          origin: this.originAirport,
          destination: this.destinationAirport
        },
      });
    }

    /*
    * fetch airports options for origin selected
    *
    * */
    fetchOrigin() {
      this.possibleOrigins = this.airService.getAirports(AIRPORT_TYPE.ORIGIN, this.destinationAirport);
    }

    /*
    * fetch airports options for destination selected
    *
    * */
    fetchDestination() {
      this.possibleDestinations = this.airService.getAirports(AIRPORT_TYPE.DEST, this.originAirport);
    }
  }
};
