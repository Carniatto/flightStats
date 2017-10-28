import angular from 'angular';
import {HistogramModule} from "./histogram/histogram.module";

let commonModule = angular.module('app.common', [
  HistogramModule
])
.name;

export default commonModule;
