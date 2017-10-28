import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {

    constructor(AirportService) {
      'ngInject';
      this.name = 'searchCard';
      this.airService = AirportService;
      this.histogramOptionsDelay = this.getHistogramOptions('Delay (mins)');
      this.histogramOptionsDelayRatio = this.getHistogramOptions('Delay Ratio (%)');
    }

    $onInit() {
    }

    getHistogramOptions(xTitle) {
      return {
        scales: {
          yAxes: [{
             ticks: { beginAtZero:true },
             scaleLabel: {
               display: true,
               labelString: 'Frequency (Flight count)'
             }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: xTitle
            }
          }]
        }
      }
    }

    fetchFlight(origin, destination) {
      this.flights = this.airService.getFlightDelays(origin, destination)
      this.flightsRatio = this.airService.getFlightDelayRatios(origin, destination)
      this.overallRatio = this.airService.getOverallRatio(origin, destination);
    }

    searchData(query) {
      this.fetchFlight(query.origin, query.destination);
    }
  }
};
