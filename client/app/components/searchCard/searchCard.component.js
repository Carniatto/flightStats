import template from './searchCard.html';
import './searchCard.scss';

export const SearchCardComponent = {
  bindings: {},
  template,
  controller: class SearchCardController {
    constructor() {
      'ngInject';
      this.name = 'searchCard';

    }
  }
};
