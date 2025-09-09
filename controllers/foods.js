const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            user: currentUser,
            foods: currentUser.foods,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/new.ejs');
});

router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.foods.id(req.params.foodId);
        res.render('foods/show.ejs', {
            user: currentUser, food
        });
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.foods.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            user: currentUser, food
        });
    } catch (error) {
        console.log(error);
        res.redirect('/foods');
    }
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.foods.push(req.body);
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
        const food = currentUser.foods.id(req.params.foodId);
        food.set(req.body);
        await currentUser.save();
        res.redirect(`/foods/${req.params.foodId}`);
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.foods.id(req.params.foodId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect(`/users/${req.params.userId}/foods`);
    }
});

module.exports = router;
