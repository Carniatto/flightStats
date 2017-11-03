import template from './results.html';
import './results.scss';

export const ResultsComponent = {
  bindings: {},
  template,
  controller: class ResultsController {
    constructor(AirportService, $stateParams) {
      'ngInject';
      this.name = 'results';
      this.airService = AirportService;
      this.origin = $stateParams['origin'];
      this.destination = $stateParams['destination'];
    }

    $onInit() {
      this.delayType = 'Minutes';
      this.bestDay = this.airService.getBestDayAndTime(this.origin, this.destination);
      this.flights = this.airService.getGraphData(this.origin, this.destination, 'ARR_DELAY');
      this.flightsRatio = this.airService.getGraphData(this.origin, this.destination, 'DELAY_RATIO');
      this.overallRatio = this.airService.getOverallRatio(this.origin, this.destination);
    }

    selectDate(date) {
      console.log(date)
    }
  }
};
