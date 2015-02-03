/* global DEBUGGER*/	

/**
 * Check object record (is defined and is valid) on setting
 * @param  {object} Vars 
 * @return {bool}    
 */
DEBUGGER.addMethod('setObjectTest', function(Vars){

	'use strict';

	if(typeof Vars.objects[Vars.key] !== 'undefined'){

		this.print('Storage', 'Try to set \''+Vars.key+'\' object which is previous defined','warn');
		return false;
	}

	if(typeof Vars.object !== 'object'){
		this.print('Storage', '\''+Vars.key+'\' is not a object','error');
		return false;
	}

	var isString =  Vars.key instanceof String || typeof Vars.key === "string";

	if(!isString ||  Vars.key == ''){
		this.print('Storage', '\''+Vars.key+'\' is bad key','error');
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

		this.print('Main:objects', 'Try to get \''+Vars.key+'\' config record which not exist','warn');
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

		this.print('Main:objects', 'Try to remove \''+Vars.key+'\' config record which not exist','warn');
		return false;
	}

	return true;
	

},['objects', 'key']);
