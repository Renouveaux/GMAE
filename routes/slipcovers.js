/**
* Manage manufacturers list
*/
var config = require('../config').get();
var restify = require('restify');

module.exports = function (app, logger) {


	/**
	* Return the list of all Slipcovers
	*
	* @param not used
	* @param response send to client the object data
	* @param next method
	*/
	function getSlipcover(req, res, next){
		Slipcovers.find(function(err, data){
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				Slipcovers.deepPopulate(data, 'slipcoverProperties, states', function (err, slipcover) {
					res.send(slipcover);
				});
			}
		});
	};

	function getSlipcoverById(req, res, next){
		Slipcovers.findById(req.params.id, function(err, slipcover){
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				res.send(slipcover);
			}
		});
	};


	/**
	* Modify all informations needed for Slipcovers
	*
	* @param req.body for the content to modify
	* @param req.params.id who content the id of Manufacturer
	* @param next method
	*
	*/  
	function putSlipcoverById(req, res, next){
		Slipcovers.findByIdAndUpdate(req.params.id, {
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
	* Create a new Slipcovers
	*
	* @param req.body content all new Data
	*
	*/
	function postSlipcover(req, res, next){
		var slipcover = new Slipcovers(req.body);

		slipcover.save(function(err) {
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
	* Delete a Slipcovers
	*
	* @param need auth level admin
	*
	*/
	function deleteSlipcover(req, res, next){
		if(req.user.privilege >= 4){

			Slipcovers.remove({_id: req.params.id}, function(err) {
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
	* Return slipcover properties by Manufacturer ID
	*
	* @param request isn't used
	* @param response send to client the object data
	* @param next method
	*/
	function getPropertiesByManufacturer(req, res, next){
		Slipcoverproperties.find({manufacturers: req.params.manufacturerId})
		.exec(function(err, d) {
			res.send(d);
		});
	};


	/**
	* Get route for Slipcovers
	*
	* @param none
	* @param promised callback
	*/
	app.get(config.api_url + '/slipcovers', getSlipcover);

	/**
	* Get route for Slipcovers
	*
	* @param none
	* @param promised callback
	*/
	app.get(config.api_url + '/slipcovers/:id', getSlipcoverById);

	/**
	* Modifiy data by PUT method
	*
	* @param 
	*/
	app.put(config.api_url + '/slipcovers/:id', putSlipcoverById);

	/**
	* Create new Slipcovers
	*
	* @param 
	*/
	app.post(config.api_url + '/slipcovers', postSlipcover);

	/**	
	* Delete a Slipcovers
	* Need privilege up than admin
	*
	*/
	app.del(config.api_url + '/slipcovers/:id', deleteSlipcover);


	app.get(config.api_url + '/slipcovers/properties/:manufacturerId', getPropertiesByManufacturer);

};