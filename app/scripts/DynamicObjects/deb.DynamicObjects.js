/* global DEBUGGER*/	

/**
 * Check object record (is defined and is valid) on setting
 * @param  {object} Vars 
 * @return {bool}    
 */
DEBUGGER.addMethod('goodKey', function(Vars){

	'use strict';

	if(typeof Vars.key=="undefined"){

		return false;
	}

	return true;
	
},['key']);



