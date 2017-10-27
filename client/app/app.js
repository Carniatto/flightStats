import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services.module';
import AppComponent from './app.component';
import 'normalize.css';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';


angular.module('app', [
    uiRouter,
    Common,
    Components,
    Services,
    'ngMaterial'
  ])
  .config(($locationProvider, ChartJsProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

  })

  .component('app', AppComponent);
