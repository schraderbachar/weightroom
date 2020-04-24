const router = require('express').Router();
let User = require('../models/user.model');

// GET REQ
router.route('/').get((req, res) => {
    User.find()
        //gets a list of all users from DB- find is mongoose mthod and returns a promis in json format.
        .then(users => res.json(users)) //returs users in json format.
        .catch(err => res.status(400).json('Error: ' + err));
});


//POST REQ
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //dev ed password hashing
    //new isnt of user using the username
    const newUser = new User({ username, email, password });
    //savs the user to the DB
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get user by ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});
//delete user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//update User by ID-- still need to update password and email logic
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;