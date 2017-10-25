import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { HomeComponent } from './home.component';

export const HomeModule = angular.module('home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.component('home', HomeComponent)

.name;
