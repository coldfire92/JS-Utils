/* global DEBUGGER*/	

/**
 * Manage dynamic objects
 * 	- get key before, after
 * 
 */
define('dynamicObject',[], function(){
	
	'use strict';

	var dynamic = function(){};
	
	dynamic.prototype =	{

		    keys : [],
	        keyIndex : {},
	 	    store : {},

	 	    /**
	 	     * Add item to storage
	 	     * @param {key} key 
	 	     * @param {mixed} obj
	 	     */
			add : function(key, obj){

				if(DEBUGGER.run('setObjectTest', {
						objects: this.store,
						key: key,
						object: obj
					}, 'DynamicObjects')){
				     
				     this.keyIndex[key] = this.keys.length;
				     this.keys.push(key);
				     this.store[key] = obj;
				     return true;
			    } 

			    return false;

			},

			/**
			 * Get item to storage
			 * @param  {string} key 
			 * @return {mixed} 			 */
			get : function(key){
				 
			    
			    if(DEBUGGER.run('getObjectTest', {
					objects: this.store,
					key: key
				}),'Storage'){

					 return this.store[key];

				} else {

					return false;
					
				}

			},

			remove : function(key){


				if(DEBUGGER.run('removeObjectTest', {
					objects: this.store,
					key: key
				})){

					delete this.store[key];

				} else {
					return false;
				}


			},


			/**
			 * Get all storage objects
			 * @return {[type]} [description]
			 */
			getAll : function(){

				return this.store;

			},

			/**
			 * Get key before
			 * @param  {string} key 
			 * @return {mixed} Return false if is first element
			 */
			getKeyBefore : function(key){

				 var keyBefore = this.keys[this.keyIndex[key] - 1];

				 if(typeof keyBefore==='undefined') {return false;}

			     return keyBefore;

			},

			/**
			 * Clear all objects
			 * @return {void}
			 */
			clear : function(){

				this.keys = [];
	        	this.keyIndex = {};
	 	        this.store = {};

			},

			/**
			 * Get key after 
			 * @param  {string} key 
			 * @return {mixed} Return false if is last element
			 */
			getKeyAfter : function(key){

			     var keyAfter = this.keys[this.keyIndex[key] + 1];

			     if(typeof keyAfter==='undefined') {return false;}

			     return keyAfter || false;

			}

	};

	return dynamic;

});
