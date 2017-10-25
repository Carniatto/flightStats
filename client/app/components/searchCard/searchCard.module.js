import angular from 'angular';
import Chart from 'chart.js/src/chart.js';
import chartjs from 'angular-chart.js';
import { SearchCardComponent }  from './searchCard.component';

export const SearchCardModule = angular.module('searchCard', [
  chartjs
])



.component('searchCard', SearchCardComponent)

.name;
