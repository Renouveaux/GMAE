/*
*
* Angular Filter to Capitalize the first Letter, used in html template
* {{myvar | capitalize}} -> Myvar
*
*/

module.exports = function(){

	return function(input, scope) {
		if (input!=null)
			input = input.toLowerCase();
		return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
	}

};