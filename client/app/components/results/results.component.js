import template from './results.html';
import './results.scss';

export const ResultsComponent = {
  bindings: {},
  template,
  controller: class ResultsController {
    byDay = false;
    constructor(AirportService, $stateParams, $scope, $state) {
      'ngInject';
      this.$scope = $scope;
      this.$state = $state;
      this.airService = AirportService;
      this.origin = $stateParams['origin'];
      this.destination = $stateParams['destination'];
      this.byDay = false;
    }

    $onInit() {
      this.delayType = 'Minutes';
      this.bestDay = this.airService.getBestDayAndTime(this.origin, this.destination);
      this.flights = this.airService.getGraphData(this.origin, this.destination, 'ARR_DELAY');
      this.flightsRatio = this.airService.getGraphData(this.origin, this.destination, 'DELAY_RATIO');
      this.overallRatio = this.airService.getOverallRatio(this.origin, this.destination);
    }

    selectDate(event) {
      this.flightsByDay = this.airService.getGraphDataByDay(this.origin, this.destination, 'ARR_DELAY', event.date);
      this.flightsByDayRatio = this.airService.getGraphDataByDay(this.origin, this.destination, 'DELAY_RATIO', event.date);
      this.byDay = true;
      this.$scope.$apply();
    }

    back() {
      if (this.byDay) {
        this.byDay = false;
      } else {
        this.$state.go('home');
      }
    }
  }
};
