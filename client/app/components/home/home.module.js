import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { HomeComponent } from './home.component';
import { AirportService } from "../../services/airport/airport.service";

export const HomeModule = angular.module('home', [
  uiRouter
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
