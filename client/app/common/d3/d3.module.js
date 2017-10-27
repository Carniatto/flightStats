import * as d3 from 'd3';

export const D3WrapperModule = angular.module('angular.d3.wrapper', [])
  .factory('D3Factory', () => d3)
  .name;
