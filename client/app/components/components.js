import angular from 'angular';
import { SearchCardModule } from './searchCard/searchCard.module';
import { HomeModule } from './home/home.module';

let componentModule = angular.module('app.components', [
  HomeModule,
  SearchCardModule
])

.name;

export default componentModule;
