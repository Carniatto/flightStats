import template from './home.html';
import './home.scss';

import { GRAPH_TYPE } from "../../services/airport/airport.constants";

export const HomeComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {

    constructor($state) {
      'ngInject';
      this.name = 'Home';
      this.$state = $state;
    }

    /*
    * Fetch the data for both histograms and the overall Ratio
    *
    * @param { Object } query containing origin and destination
    * */
    searchData(query) {
      this.$state.go('results', {origin: query.origin, destination: query.destination});
    }
  }
};
