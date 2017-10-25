import template from './home.html';
import './home.scss';

/**
* @ngdoc component
* @name app.components
*
* @description
* This component shows cards using the item binding for his own building.
*
**/
export const HomeComponent = {
  bindings: {},
  template,
  controller: class HomeController {
    constructor() {
      this.name = 'home';
    }
  }
};

