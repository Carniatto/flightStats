import angular from 'angular';
import { HomeModule } from './home/home.module';
import { SearchCardModule } from './searchCard/searchCard.module';
import { AirportSelectorModule } from './airportSelector/airportSelector.module';

let componentModule = angular.module('app.components', [
  HomeModule,
  SearchCardModule,
  AirportSelectorModule
])

.name;

export default componentModule;
