import template from './histogram.html';
import './histogram.scss';

export const HistogramComponent = {
  bindings: {
    data: '<',
    title: '@'
  },
  template,
  controller: class HistogramController {
    constructor() {
      'ngInject';
      this.name = 'histogram';
    }

    $onInit() {
      this.options = this.getHistogramOptions(this.title);
    }

    $onChanges() {

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


  }
};
