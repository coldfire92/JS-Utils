/*global describe, it, expect, beforeEach */

(function(){
	'use strict';

	var Storage;

	// test object

	var obj = {
      			string : 'Test'
      		};
      	
	describe('Storage', function(){

      it('should load the AMD Storage module', function(done) {
          
          
          require(['Storage'], function (Module) {
           
             Storage = Module;

             expect(Storage.add).toBeDefined();

               beforeEach(function() {
        
                  Storage.clear();
                
               });

             done();

          });

      }); 

      it('should not except bad object', function() {
      	
      		Storage.add();
      		Storage.add('', {});

      		console.log(Storage.getAll());
      		
      		expect(Storage.getAll()).toEqual({});

      });


      it('should add and read good object', function() {

      		Storage.add('key', obj);

      		expect(Storage.get('key')).toEqual(obj);

      });

      it('should add and remove object', function() {
      		
      		expect(Storage.getAll()).toEqual({});
      		
      		Storage.add('key', obj);

      		expect(Storage.get('key')).toEqual(obj);

      		Storage.remove('key');

      		expect(Storage.getAll()).toEqual({});

      });

      it('should not get not existing object', function() {
      		
      		expect(Storage.getAll()).toEqual({});

      		expect(Storage.get('key')).toBeFalsy();

      });

      it('should show warn when deleting not existing object', function() {
          
          expect(Storage.getAll()).toEqual({});

          expect(Storage.remove('key')).toBeFalsy();

      });


      it('should show that try to set null object', function() {
          
          Storage.add('key', null);

          expect(Storage.getAll()).toEqual({});

      });

      it('should remove all object', function() {

      		Storage.add('key', obj);

      		Storage.add('key2', obj);

	        Storage.add('key3', obj);

	        Storage.clear();

      		expect(Storage.getAll()).toEqual({});

      });

	});

})();
