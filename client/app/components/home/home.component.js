import template from './home.html';
import './home.scss';

import { GRAPH_TYPE } from "../../services/airport/airport.constants";

export const HomeComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {

    constructor(AirportService) {
      'ngInject';
      this.name = 'Home';
      this.airService = AirportService;
    }

    /*
    * Fetch the data for both histograms and the overall Ratio
    *
    * @param { Object } query containing origin and destination
    * */
    searchData(query) {
      this.flights = this.airService.getHistogramData(query.origin, query.destination, GRAPH_TYPE.DELAY);
      this.flightsRatio = this.airService.getHistogramData(query.origin, query.destination, GRAPH_TYPE.DELAY_RATIO);
      this.overallRatio = this.airService.getOverallRatio(query.origin, query.destination);
    }
  }
};
