
var mongoose = require('mongoose')
, Patients = mongoose.model('Patients')
, ObjectId = mongoose.Types.ObjectId
, restify = require('restify');


exports.getPatient = function(req, res, next) {

	var query = req.params;		

	var patient = Patients.find();

	patient.exec(function(err, data){

		if(err){
			var errObj = err;
			if (err.err) { errObj = err.err; }
			return next(new restify.InternalError(errObj));
		}else{
			res.send(data);
		};

	});

}

var postPatients = function(data, cb){

	var patient = new Patients(data);

	patient.save(function(err, data) {
		if(err){
			var errObj = err;
			if (err.err) { errObj = err.err; }
			return next(errObj);
		}else{
			return cb(null, data._id);
		}
	});

}

exports.postPatients = postPatients;