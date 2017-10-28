import HistogramModule from './histogram.module';
import HistogramTemplate from './histogram.html';

describe('Histogram', () => {
  let $rootScope, $componentController;

  beforeEach(window.module(HistogramModule));

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
      controller = $componentController('histogram', {
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
      expect(HistogramTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

});
