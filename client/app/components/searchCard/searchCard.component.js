import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {
    flights;
    flightsRatio;
    options;

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
    }

    searchData(query) {
      console.log('origin', query.origin);
      console.log('destination', query.destination);
      this.fetchFlight(query.origin, query.destination);
    }
  }
};
