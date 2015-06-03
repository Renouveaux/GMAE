/**
* User Routes module
*    these routes require authenticated users
*/
var mongoose = require('mongoose')
, Requests = mongoose.model('Request')
, Patients = mongoose.model('Patients')
, states = require('./states')
, patient = require('./patients')
, ObjectId = mongoose.Types.ObjectId
, restify = require('restify');

	/**
	* Gateway request routes to other functions based on params
	* Search for a user by id or username
	* if none given get the logged in user's information
	*
	* @param request can include an id, a username or no search param
	* @param response contains a populated User object
	* @param next method
	*/
	exports.getRequest = function(req, res, next) {

		var query = req.params;		

		var request = Requests.find();

		/*
		* On filtre les elements existant
		*/
		if(typeof query.exist !== 'undefined'){
			var obj = query.exist.split(',');

			for (var i=0; i<obj.length; i++) {
				request.exists(obj[i]);
			}
		};

		/*
		* On filtre les elements n'existant pas
		*/
		if(typeof query.nexist !== 'undefined'){
			var obj = query.nexist.split(',');

			for (var i=0; i<obj.length; i++) {
				request.exists(obj[i], false);
			}
		};

		/*
		* On populate le state avec un filtre en surplus
		*/
		if(typeof query.state !== 'undefined'){
			var obj = query.state.split(',');
			var filter = [];

			for (var i=0; i<obj.length; i++) {
				filter.push(obj[i]);
			}		
			request.populate('states', 'value', {value : { $in: filter }});
		};


		request.exec(function(err, data){

			if(err){
				var errObj = err;
				if (err.err) { errObj = err.err; }
				return next(new restify.InternalError(errObj));
			}else{
				Request.deepPopulate(data, 'users.services, patients.patientData.services, states, engines.engineProperties, hire, renters, slipcovers', function (err, _posts) {
					/*
					* Corrige le problème de mongoose, supprime les states à null (suite au populate précédent)
					*/
					_posts = _posts.filter(function(el){
						return el.states !== null;
					});

					if(typeof query.filter !== 'undefined'){
						_posts = _posts.filter(function(el){
							return el.engines.engineProperties.model.toLowerCase() == query.filter.toLowerCase();
						});
					};

					/*
					* Toujours due au populate on fait le limit à la main
					*/
					if(typeof query.limit !== 'undefined'){
						_posts = _posts.slice(0, query.limit);
					};

					res.send(_posts);
				});
			};
		});
	};

	exports.postRequest = function(req, res, next){

		var request = new Requests(
		{
			users : req.user._id,
			mail: req.body.mail
		});

		request.pre('save', function(next){
			states.getFnStatesByValue("7", function(err, data){				
				request.states = data._id;
				next();
			});
		});

		request.pre('save', function(next){
			patient.postPatients(req.body, function(err, data){
				if(err){
					var errObj = err;
					if (err.err) { errObj = err.err; }
					return next(new restify.InternalError(errObj));
				}else{
					request.patients = data;
					next();	
				}				
			});
		});

		request.save(function(err, data){
			if(err){
				var errObj = err;
				if (err.err) { errObj = err.err; }
				Patients.remove({_id: patient.id}, function(err, data){});
				return next(new restify.InternalError(errObj));
			}else{
				res.send(201);
			}
		});

	};
