import template from './home.html';
import './home.scss';

import { GRAPH_TYPE } from "../../services/airport/airport.constants";

/**
* @ngdoc component
* @name app.components
*
* @description
* This component shows cards using the item binding for his own building.
*
**/
export const HomeComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {

    constructor(AirportService) {
      'ngInject';
      this.name = 'Home';
      this.airService = AirportService;
    }

    fetchFlight(origin, destination) {
      console.time('getflight');
      this.flights = this.airService.getHistogramData(origin, destination, GRAPH_TYPE.DELAY);
      this.flightsRatio = this.airService.getHistogramData(origin, destination, GRAPH_TYPE.DELAY_RATIO);
      console.timeEnd('getflight');
      this.overallRatio = this.airService.getOverallRatio(origin, destination);
    }

    searchData(query) {
      this.fetchFlight(query.origin, query.destination);
    }
  }
};
