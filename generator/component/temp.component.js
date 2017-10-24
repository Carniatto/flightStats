import template from './<%= name %>.html';
import './<%= name %>.scss';

export const <%= upCaseName %>Component = {
  bindings: {},
  template,
  controller: class <%= upCaseName %>Controller {
    constructor() {
      'ngInject';
      this.name = '<%= name %>';
    }
  }
};
