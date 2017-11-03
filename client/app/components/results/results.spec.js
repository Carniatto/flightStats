import ResultsModule from './results.module';
import ResultsTemplate from './results.html';

describe('Results', () => {
  let $rootScope, $componentController;

  beforeEach(window.module(ResultsModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('results', {
        $scope: $rootScope.$new()
      });
    });
    
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(ResultsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

});
