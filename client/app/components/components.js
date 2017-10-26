import angular from 'angular';
import { HomeModule } from './home/home.module';
import { SearchCardModule } from './searchCard/searchCard.module';

let componentModule = angular.module('app.components', [
  HomeModule,
  SearchCardModule
])

.name;

export default componentModule;
