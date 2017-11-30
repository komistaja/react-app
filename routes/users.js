let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

let User = require('../models/userschema');

module.exports = router;

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req)
    User.create({

            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database");
            res.status(200).send(user);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users");
        res.status(200).send(users);
    });
});

// RETURNS USER BY ID
router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user")
    if (!user) return res.status(404).send("User not found")
    res.status(200).send(user)
  })
})

// DELETES USER
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User "+ user.name +" deleted.");
  });
});

// UPDATE USER
router.put('/:id', function (req, res) {

    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router
