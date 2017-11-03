import angular from 'angular';
import uiRouter from 'angular-ui-router';
import chartjs from 'angular-chart.js';
import nvd3 from 'angular-nvd3'
import { HomeComponent } from './home.component';

export const HomeModule = angular.module('home', [
  uiRouter,
  chartjs,
  nvd3
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home',
      resolve: {
        csv: (AirportService) => {
          return AirportService.fetchFiles()
        }
      }
    });
})

.component('home', HomeComponent)

.name;
