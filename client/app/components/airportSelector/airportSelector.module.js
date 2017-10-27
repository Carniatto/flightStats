import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-material';
import { AirportSelectorComponent }  from './airportSelector.component';


export const AirportSelectorModule = angular.module('airportSelector', [
  uiRouter
])

.component('airportSelector', AirportSelectorComponent)

.name;
