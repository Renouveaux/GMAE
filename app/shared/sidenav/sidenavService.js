module.exports = function($resource, configService){

	return $resource(configService.API + '/menu', {}, {
		query:{
			method:'GET', 
			isArray:true
		}
	});

};