import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { ResultsComponent }  from './results.component';

export const ResultsModule = angular.module('results', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('results', {
      url: '/results/:origin/:destination',
      component: 'results',
      resolve: {
        csv: (AirportService) => {
          return AirportService.fetchFiles()
        }
      }
    });
})

.component('results', ResultsComponent)

.name;
