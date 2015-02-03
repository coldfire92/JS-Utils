/* global define, DEBUGGER */

/* ==========================================================================
   Storage objects
   ========================================================================== */

define('Storage',[], function(){

	'use strict';

	// storaged objects
	var	objects = {};
 
    /**
     * Add object to storage
     * @param  {string} key   
     * @param  {object} value 
     * @return {void}    
     */
	var setObject = function(key, value){

		
		if(DEBUGGER.run('setObjectTest', {
			objects: objects,
			key: key,
			object: value
		}, 'Storage')){
			
			objects[key] = value;

		}
		
	};

	/**
	 * Get object from storage
	 * @param  {string} key 
	 * @return {object} 
	 */
	var getObject = function(key){

		if(DEBUGGER.run('getObjectTest', {
			objects: objects,
			key: key
		}),'Storage'){

			return objects[key];

		} else {

			return false;
			
		}

	};


	/**
	 * Remove object from storage
	 * @param  {string} key 
	 * @return {void}     
	 */
	var removeObject = function(key){

			
		if(DEBUGGER.run('removeObjectTest', {
			objects: objects,
			key: key
		})){

			delete objects[key];

		}

	};

	return {

		/**
		 * add object
		 * @param {string} key    
		 * @param {} object
		 */
		add : function(key, object){

			setObject(key, object);

		},

		/**
		 * Get object
		 * @param  {string} key 
		 * @return {}  
		 */
		get : function(key){

			return getObject(key);

		},

		/**
		 * Remove object
		 * @param  {string} key 
		 * @return {}		 */
		remove : function(key){

			removeObject(key);

		},

		/**
		 * Clear all objects
		 */
		clear : function(){

			objects = {};

		},

		/**
		 * get all cache objects
		 * @return {object}
		 */
		getAll : function(){

			return objects;

		}
	};

});
