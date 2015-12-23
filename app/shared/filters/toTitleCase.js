
module.exports = function(str){

	return str.replace(/\w\S*/g, function(txt){
		if(_.indexOf(['PC','USA','U.S.A'],txt)===-1){
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		} else {
			return txt;
		}
	});

};