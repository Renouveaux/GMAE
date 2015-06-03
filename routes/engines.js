/**
* User Routes module
*    these routes require authenticated users
*/
var mongoose = require('mongoose')
, ObjectId = mongoose.Types.ObjectId
, restify = require('restify')
, config = require('../config').get()
, fs = require('fs');

module.exports = function (app, logger) {

	/**
	* This function return the list of Engines with properties, states and manufacturer informations
	*
	* @param request isn't used
	* @param response send to client the object data
	* @param next method
	*/
	function getEngine(req, res, next) {
		Engines.find({}, function (err, data) {
			if(err){
				console.log(err);
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				Engines.deepPopulate(data, 'states, engineProperties.manufacturers', function (err, engine) {
					res.send(engine);
				});
			}
		});
	};

	/**
	* Same as previous but return only one engine, searching by Id or Serial number
	*
	* @param request containe just the search params
	* @param response send to client the object data
	* @param next method
	*/
	function getEngineByIdOrSerial(req, res, next) {

		var search = req.params.search;

		if (search !== null && search !== '') {
			var query = Engines.where( 'serial', new RegExp('^'+search+'$', 'i') );
			query.findOne(function (err, data) {
				if (!err) {
					if (data) {
						Engines.deepPopulate(data, 'states, engineProperties.manufacturers', function (err, engine) {
							res.send(engine);
						});
					} else {
						Engines.findById(search, function (err, data) {
							if (!err) {
								Engines.deepPopulate(data, 'states, engineProperties.manufacturers', function (err, engine) {
									res.send(engine);
								});
							} else {
								res.send(new restify.MissingParameterError('Engine not found.'));
							}
							return next();
						});
					}
				} else {
					var errObj = err;
					if (err.err) { errObj = err.err; }
					return next(new restify.InternalError(errObj));
				}
			});
		} else {
			return next(new restify.MissingParameterError('Serial or ID required.'));
		};
	};

	/**
	* Return all active Engines
	*
	* @param request isn't used
	* @param response send to client the object data
	* @param next method
	*/
	function getEngineActive(req, res, next){
		var data;
		Engines.find()
		.populate('states', null, {value: {$in: [4]}})
		.populate('engineProperties')
		.exec(function(err, d) {
			if(d){
				data = d.filter(function(el){
					return el.states !== null;
				});
				res.send(data);
			}else{
				return next(new restify.NotFoundError('No data found.'));
			}
		});
	};

	/**
	* Return all active Engines and filter it by Manufacturer Id
	*
	* @param request isn't used
	* @param response send to client the object data
	* @param next method
	*/
	function getEngineActiveWithFilter(req, res, next){

	};

	/**
	* Return all active Engines and filter it by Manufacturer Id
	*
	* @param request isn't used
	* @param response send to client the object data
	* @param next method
	*/
	function getPropertiesByManufacturer(req, res, next){
		Engineproperties.find({manufacturers: req.params.manufacturerId})
		.exec(function(err, d) {
			res.send(d);
		});
	};


	app.get(config.api_url + '/engines', getEngine);

	app.get(config.api_url + '/engines/filter/:search', getEngineByIdOrSerial);

	app.get(config.api_url + '/engines/active/', getEngineActive);

	app.get(config.api_url + '/engines/active/:filter', getEngineActiveWithFilter);

	app.get(config.api_url + '/engines/properties/:manufacturerId', getPropertiesByManufacturer);

}