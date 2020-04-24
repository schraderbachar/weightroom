const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// GET REQ
router.route('/').get((req, res) => {
    Exercise.find()
        //gets a list of all exercises from DB- find is mongoose mthod and returns a promise in json format.
        .then(exercises => res.json(exercises)) //returns exercises in json format.
        .catch(err => res.status(400).json('Error: ' + err));
});


//POST REQ
router.route('/add').post((req, res) => {
    //creates new instances and puts it in the body
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    //pushes a new exercise to the database.
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    //save the exercise to the DB
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//get exercise by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
//delete exercise by ID
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//update exercise by ID
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;