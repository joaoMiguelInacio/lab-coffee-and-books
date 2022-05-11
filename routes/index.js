const express = require('express');
const router  = express.Router();
const Place = require('../models/Place.model');

//http://localhost:3000/places
router.get('/', (req, res, next) => {
  res.render('places/index');
});

router.get('/new', (req, res, next) => {
  res.render('places/new');
});

router.post('/new', (req, res, next) => {
  const { name, type, longitude, latitude } = req.body;

	const newPlace = new Place({
    name,
    type,
		location: {
      type: 'Point',
      coordinates: [longitude, latitude]
		}
  });

	newPlace
    .save()
    .then(place => {
      res.redirect('/places');
    })
    .catch(error => {
      next(error);
    });
});

// GET => to retrieve all the places from the DB
router.get('/list', (req, res, next) => {
	Place.find({},(error, placesFromDB) => {
		if (error) { 
			next(error); 
		} else {
			console.log(placesFromDB)
			res.render('places/list', { places: placesFromDB });
		}
	});
});

// GET => get the form pre-filled with the details of one place
router.get('/:place_id/edit', (req, res, next) => {
	Place.findById(req.params.place_id, (error, place) => {
		if (error) {
			next(error);
		} else {
			res.render('places/update', { place });
		}
	});
});

// POST => save updates in the database
router.post('/:place_id', (req, res, next) => {
	Place.findById(req.params.place_id, (error, place) => {
		if (error) { 
      next(error); 
    } else {
			place.name        = req.body.name;
			place.type = req.body.type;
			
			place.save(error => {
				if (error) { 
					next(error); 
				} else { 
					
					res.redirect(`/places/${req.params.place_id}`); 
				}
			});
		}
	});
});

// DELETE => remove the place from the DB
router.get('/:place_id/delete', (req, res, next) => {
	Place.remove({ _id: req.params.place_id }, function(error, place) {
		if (error) {
			next(error);
		} else {
			res.redirect('/places');
		}
	});
});


// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
	place.find({}, (error, allplacesFromDB) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ places: allplacesFromDB });
		}
	});
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
	let placeId = req.params.id;
	Place.findOne({_id: placeId}, (error, oneplaceFromDB) => {
		if (error) { 
			next(error) 
		} else { 
			res.status(200).json({ place: oneplaceFromDB }); 
		}
	});
});

// GET => get the details of one place
router.get('/:place_id', (req, res, next) => {
	Place.findById(req.params.place_id, (error, place) => {
		if (error) {
			next(error);
		} else {
			res.render('places/show', { place: place });
		}
	});
});


module.exports = router;
