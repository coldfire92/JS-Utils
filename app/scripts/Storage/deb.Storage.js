/* global DEBUGGER*/	

/**
 * Check object record (is defined and is valid) on setting
 * @param  {object} Vars 
 * @return {bool}    
 */
DEBUGGER.addMethod('setObjectTest', function(Vars){

	'use strict';

	// check objects

	if(typeof Vars.objects[Vars.key] !== 'undefined'){

		this.print(Vars.moduleNameCall, 'Try to set \''+Vars.key+'\' object which is previous defined','warn');
		return false;
	}

	if(typeof Vars.object === 'undefined'){
		this.print(Vars.moduleNameCall, '\''+Vars.key+'\' is not defined','error');
		return false;
	}

	if(Vars.object === null){
		this.print(Vars.moduleNameCall, '\''+Vars.key+'\' is empty object (null)','warn');
		return false;
	}

	// check key

	var isString =  Vars.key instanceof String || typeof Vars.key === "string";

	if(!isString ||  Vars.key == ''){
		this.print(Vars.moduleNameCall, '\''+Vars.key+'\' is bad key','error');
		return false;
	}
	
	return true;
	
},['objects', 'key', 'object']);


/**
 * Check object record (is defined) on getting
 * @param  {object} Vars 
 * @return {bool}    
 */
DEBUGGER.addMethod('getObjectTest', function(Vars){

	'use strict';

	if(typeof Vars.objects[Vars.key] === 'undefined'){

		this.print(Vars.moduleNameCall, 'Try to get \''+Vars.key+'\' config record which not exist','warn');
		return false;
	}

	return true;
	

},['objects', 'key']);


/**
 * Check object record (is defined) on removing
 * @param  {object} Vars 
 * @return {bool}    
 */
DEBUGGER.addMethod('removeObjectTest', function(Vars){

	'use strict';

	if(typeof Vars.objects[Vars.key] === 'undefined'){

		this.print(Vars.moduleNameCall, 'Try to remove \''+Vars.key+'\' config record which not exist','warn');
		return false;
	}

	return true;
	

},['objects', 'key']);

