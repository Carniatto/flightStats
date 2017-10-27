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
      this.airService = AirportService;

      this.allOrigins = this.airService.getAirportOrigins();
      this.allDestinations = this.airService.getAirportDestinations();
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

    fetchOrigin() {
      this.possibleOrigins = this.airService.getAirportOrigins(this.destinationAirport);
    }

    fetchDestination() {
      this.possibleDestinations = this.airService.getAirportDestinations(this.originAirport);
    }
  }
};
