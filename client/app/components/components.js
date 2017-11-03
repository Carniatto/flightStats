import angular from 'angular';
import { HomeModule } from './home/home.module';
import { AirportSelectorModule } from './airportSelector/airportSelector.module';
import {ResultsModule} from "./results/results.module";

let componentModule = angular.module('app.components', [
  HomeModule,
  ResultsModule,
  AirportSelectorModule
])

.name;

export default componentModule;
