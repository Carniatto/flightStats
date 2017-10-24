import angular from 'angular';
import SearchCardModule from './searchCard/searchCard.module';

let componentModule = angular.module('app.components', [
  SearchCardModule
])

.name;

export default componentModule;
