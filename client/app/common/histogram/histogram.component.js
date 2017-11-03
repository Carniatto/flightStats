import template from './histogram.html';
import './histogram.scss';

export const HistogramComponent = {
  bindings: {
    onSelectDate: '&',
    data: '<',
    title: '@',
  },
  template,
  controller: class HistogramController {
    constructor() {
      'ngInject';
      this.name = 'histogram';
    }

    $onInit() {
      this.options = this.getHistogramOptions(this.title);
      this.fn = this.selectDate.bind(this)
    }

    /*
    * builds the option object for Chartjs
    *
    * @param { String } yTitle title for y axis
    *
    * @return { Object } graph options object
    * */
    getHistogramOptions(yTitle) {
      return {
        scales: {
          yAxes: [{
            ticks: { beginAtZero:true },
            scaleLabel: {
              display: true,
              labelString: yTitle
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Days of the month'
            }
          }]
        }
      }
    }

    /*
    * emits a search event passign the query params
    *
    * */
    selectDate(event) {
      this.onSelectDate({
        $event: {
          date: event[0]._model.label
        }
      });
    }


  }
};
