const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const Model = mongoose.model('trips');

// Get: /trips - list of all trips
const tripsList = async(req, res) => {
  const q = await Model
    .find({'code' : req.params.tripCode}) //return single record 
    .exec();

    //console.log(q);

  if(!q)
  {//Database return no data
    return res
      .status(404)
      .json(err);
  }
  else{ // Return resulting trip list 
    return res
      .status(200)
      .json(q);
  } 
};

module.exports = {
  tripsList, 
  tripsFindByCode
};