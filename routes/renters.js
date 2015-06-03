/**
* Manage Renters list
*/
var config = require('../config').get();
var restify = require('restify');

module.exports = function (app, logger) {


	/**
	* Return the list of all Renters
	*
	* @param not used
	* @param response send to client the object data
	* @param next method
	*/
	function getRenters(req, res, next){
		Renters.find(function(err, manufacturers){
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				res.send(manufacturers);
			}
		});
	};

	function getRentersById(req, res, next){
		Renters.findById(req.params.id, function(err, manufacturer){
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				res.send(manufacturer);
			}
		});
	};


	/**
	* Modify all informations needed for Renters
	*
	* @param req.body for the content to modify
	* @param req.params.id who content the id of Renters
	* @param next method
	*
	*/  
	function putRentersById(req, res, next){
		Renters.findByIdAndUpdate(req.params.id, {
			$set: req.body
		}, function(err){
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				res.send(200);
			}
		});
	};

	/**
	*
	* Create a new Renters
	*
	* @param req.body content all new Data
	*
	*/
	function postRenters(req, res, next){
		var renters = new Renters(req.body);

		renters.save(function(err) {
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				res.send(201);
			}
		});
	};

	/**
	*
	* Delete a Renters
	*
	* @param need auth level admin
	*
	*/
	function deleteRenters(req, res, next){
		if(req.user.privilege >= 4){

			Renters.remove({_id: req.params.id}, function(err) {
				if(err){
					console.log(err);
					var errObj = err;
					if (err.err) { errObj = err.err; }
					return next(new restify.InternalError(errObj));
				}else{
					res.send(204);
				}
			});


		}else{
			return next(new restify.UnauthorizedError("Vous n'avez pas l'autorisation d'executer cette action."));
		};
	};


	/**
	* Get route for Renter
	*
	* @param none
	* @param promised callback
	*/
	app.get(config.api_url + '/renters', getRenters);

	/**
	* Get route for Renter
	*
	* @param none
	* @param promised callback
	*/
	app.get(config.api_url + '/renters/:id', getRentersById);

	/**
	* Modifiy data by PUT method
	*
	* @param 
	*/
	app.put(config.api_url + '/renters/:id', putRentersById);

	/**
	* Create new Renter
	*
	* @param 
	*/
	app.post(config.api_url + '/renters', postRenters);

	/**	
	* Delete a Renter
	* Need privilege up than admin
	*
	*/
	app.del(config.api_url + '/renters/:id', deleteRenters);

};