/*global describe, it, expect, beforeEach */

(function(){
	'use strict';

	var DynamicObject;

	// test object

	var obj = {
      			string : 'Test'
      		};
      	
	describe('DynamicObjects', function(){


      it('should load the AMD DynamicObject module', function(done) {
          
          
          require(['DynamicObject'], function (Module) {
           
             DynamicObject = new Module();

             expect(DynamicObject.add).toBeDefined();

               beforeEach(function() {
        
                  DynamicObject.clear();
                
               });

             done();

          });

      }); 

      it('should not except bad object', function() {
      	
      		DynamicObject.add();
      		DynamicObject.add('', {});

      		console.log(DynamicObject.getAll());
      		
      		expect(DynamicObject.getAll()).toEqual({});

      });


      it('should add and read good object', function() {

      		DynamicObject.add('key', obj);

      		expect(DynamicObject.get('key')).toEqual(obj);

      });
 
      it('should not get not existing object', function() {
      		
      		expect(DynamicObject.getAll()).toEqual({});

      		expect(DynamicObject.get('key')).toBeFalsy();

      });

      it('shoulld show warn when deleting not existing object', function() {
          
          expect(DynamicObject.getAll()).toEqual({});

          expect(DynamicObject.remove('key')).toBeFalsy();

      });

      it('Should return false when first object', function() {
        
          DynamicObject.add('key', obj);

          DynamicObject.add('key2', obj);

          expect(DynamicObject.getKeyBefore('key')).toBeFalsy();

      });

      it('Should return false when last object', function() {
        
          DynamicObject.add('key', obj);

          DynamicObject.add('key2', obj);

          expect(DynamicObject.getKeyAfter('key2')).toBeFalsy();

      });

	});

})();
