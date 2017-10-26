import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {
    flights;
    flightsRatio;
    query = '';

    constructor(AirportService) {
      'ngInject';
      this.name = 'searchCard';
      this.airport = AirportService;
    }

    $onInit() {
      this.airport.fetchCsv().then(
        () => this.fetchFlight()
      )
    }

    fetchFlight() {
      this.flights = this.airport.getFlightDelays('SAN', 'DFW', this.query)
        // .then(res => {
        //   console.log('filtered result: ', res)
        //   this.flights = res/* {
        //     data: res.map(({value}) => value),
        //     labels: res.map(({key}) => key+'%')
        //   }; */
        // });
      this.flights = this.airport.getFlightDelayRatios('SAN', 'DFW', this.query)
        // .then(res => {
        //   console.log('filtered result ratio: ', res)
        //   this.flightsRatio = res/* {
        //     data: res.map(({value}) => value),
        //     labels: res.map(({key}) => key+'%')
        //   }; */
        // });
    }
  }
};
