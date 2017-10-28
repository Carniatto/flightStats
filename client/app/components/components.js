import angular from 'angular';
import { HomeModule } from './home/home.module';
import { AirportSelectorModule } from './airportSelector/airportSelector.module';

let componentModule = angular.module('app.components', [
  HomeModule,
  AirportSelectorModule
])

.name;

export default componentModule;
