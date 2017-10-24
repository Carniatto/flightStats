import angular from 'angular';
import AirportModule from "./airport/airport.module";

let ServicesModule = angular.module('app.services', [
    AirportModule
])
.name;

export default ServicesModule;
