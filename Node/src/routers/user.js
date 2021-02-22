const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = new express.Router();

router.post('/register', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()

		user.sendVerificationEmail();
		
		const token = await user.generateAuthToken();
		res.status(201).send(token)
	} catch(e) {
		res.status(400).send(e)
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send(token)
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

router.patch('/edit', auth, async (req, res) => {
	try {
		if(req.body.password.length > 0) {
			const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password);
			if(!isMatch) {
				throw new Error("Passwords don't match!");
			}
		}
		
		const updates = req.body;
		delete updates.oldPassword;
		delete updates.token;
		if(updates.password === '') delete updates.password;

		let emailChanged = false;
		if(updates.email !== req.user.email) {
			req.user.verified = false;
			emailChanged = true;
		}

		for(let item in updates) {
			req.user[item] = updates[item];
		}
		await req.user.save();

		emailChanged && req.user.sendVerificationEmail(1);

		res.send()
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
})

router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();

		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

router.post('/delete', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send();
	} catch (e) {
		res.status(500).send(e);
	}
})

router.get('/verifyEmail', async (req, res) => {
	const email = req.query.email;

	try {
		const user = await User.findOne({ email });
		user.verified = true;
		await user.save();

		const message = `<h1>Your email address has been verified!</h1>
		<p>Click <a href='http://localhost:8080/profile'>here</a> to get back to your profile page.</p>`
		res.send(message)
	} catch (e) {
		res.status(400).send(e);
	}
})

router.post('/sendVerify', auth, async (req, res) => {
	try {
		req.user.sendVerificationEmail(2);
		res.send();
	} catch (e) {
		res.status(400).send(e);
	}
})

module.exports = router