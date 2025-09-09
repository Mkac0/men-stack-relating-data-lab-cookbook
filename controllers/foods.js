const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            user: currentUser,
            foods: currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/new.ejs', {
        user: currentUser,
        foods: currentUser.pantry,
    });
});

router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/show.ejs', {
            user: currentUser, food
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.get('/users/:userId/foods/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            user: currentUser, food
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        food.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${req.params.userId}/foods/${req.params.foodId}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

module.exports = router;
