import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { HistogramComponent }  from './histogram.component';

export const HistogramModule = angular.module('histogram', [
  uiRouter
])

.component('histogram', HistogramComponent)

.name;
