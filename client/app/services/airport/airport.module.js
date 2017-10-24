import angular from 'angular';
import { AirportService } from "./airport.service";

let AirportModule = angular.module('AirportModule', [

])

.service('AirportService', AirportService)

.name;


export default AirportModule;
