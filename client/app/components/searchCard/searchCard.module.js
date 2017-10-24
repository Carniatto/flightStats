import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { SearchCardComponent }  from './searchCard.component';

let SearchCardModule = angular.module('searchCard', [
  uiRouter
])

.component('searchCard', SearchCardComponent)

.name;

export default SearchCardModule;
