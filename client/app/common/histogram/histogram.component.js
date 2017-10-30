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

    /*
    * builds the option object for Chartjs
    *
    * @param { String } xTitle title for x axis
    *
    * @return { Object } graph options object
    * */
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
