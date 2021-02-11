const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/register', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		res.status(201).send(user)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token })
	} catch (e) {
		res.status(400).send(e);
	}
})

router.post('/profile', auth, async (req, res) => {
	try {
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e)
	}
})

module.exports = router