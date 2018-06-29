const Http = require('../../src/Http');

describe('Https.js', () => {
  describe('constructor', () => {
    test('throws an exception because the json is not valid', () => {
      try {
        new Http({});
      } catch (e) {
        expect(e).toEqual({
          errors: [{
            dataPath: '',
            keyword: 'required',
            message: 'should have required property \'method\'',
            params: {missingProperty: 'method'},
            schemaPath: '#/required',
          }, {
            dataPath: '',
            keyword: 'required',
            message: 'should have required property \'endpoint\'',
            params: {missingProperty: 'endpoint'},
            schemaPath: '#/required',
          }], valid: false, issue: {},
        });
      }
    });

    test('throws an exception because the json is not valid', () => {
      try {
        new Http({method: 'get'});
      } catch (e) {
        expect(e).toEqual({
          errors: [{
            dataPath: '',
            keyword: 'required',
            message: 'should have required property \'endpoint\'',
            params: {'missingProperty': 'endpoint'},
            schemaPath: '#/required',
          }], valid: false, issue: {method: 'get'},
        });
      }
    });

    test('throws an exception because the json is not valid', () => {
      try {
        new Http({
          method: 'skrt',
          endpoint: '/data',
        });
      } catch (e) {
        expect(e).toEqual({
          errors: [{
            dataPath: '.method',
            keyword: 'enum',
            message: 'should be equal to one of the allowed values',
            params: {allowedValues: ['get', 'post', 'put', 'delete']},
            schemaPath: '#/properties/method/enum',
          }], issue: {endpoint: '/data', method: 'skrt'}, valid: false,
        });
      }
    });
  });

  describe('.method', () => {
    test('gets the method', () => {
      const h = new Http({method: 'post', endpoint: '/skrt'});

      expect(h.method).toBe('post');
    });
  });

  describe('.endpoint', () => {
    test('gets the endpoint', () => {
      const h = new Http({method: 'post', endpoint: '/skrt'});

      expect(h.endpoint).toBe('/skrt');
    });
  });
});
