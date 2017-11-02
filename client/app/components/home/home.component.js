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
      this.bestDay = this.airService.getBestDayAndTime(query.origin, query.destination);
      this.flights = this.airService.getGraphData(query.origin, query.destination, 'ARR_DELAY');
      this.flightsRatio = this.airService.getGraphData(query.origin, query.destination, 'DELAY_RATIO');
      this.overallRatio = this.airService.getOverallRatio(query.origin, query.destination);
    }
  }
};
