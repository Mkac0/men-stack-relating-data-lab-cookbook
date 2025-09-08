const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (requestAnimationFrame, res) => {
    try {
        const currentUser = await User.findById(requestAnimationFrame.session.user._id);
        res.render('foods.js/index.ejs', {
            foods: currentUser.foods,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

module.exports = router;
