const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	surname: {
		type: String,
		trim: true
	},
	age: {
		type: Number,
		validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	verified: {
		type: Boolean,
		default: 'false'
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		trim: true
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

	user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.methods.sendVerificationEmail = async function(action = 0) {
	const user = this;
	
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
		  user: process.env.EMAIL,
		  pass: process.env.PASS,
		},
	});

	let fullName = user.name;
	if(user.surname !== '') fullName += ' ' + user.surname;

	let message;
	if(action == 0) {
		message = `<b>Hello, ${fullName}!</b>
		<p>Welcome to our page! Please verify your email address by clicking on this <a href='http://localhost:3000/verifyEmail?email=${user.email}'>link</a>.</p>
		<p>If you received this email by mistake, please simply ignore it.</p>`
	} else if(action == 1) {
		message = `<b>Hello, ${fullName}!</b>
		<p>Your email address has been updated. To verify it, please click on this <a href='http://localhost:3000/verifyEmail?email=${user.email}'>link</a>.</p>
		<p>If you received this email by mistake, please simply ignore it.</p>`
	} else {
		message = `<b>Hello, ${fullName}!</b>
		<p>This email has been sent on demand. To verify your email address, please click on this <a href='http://localhost:3000/verifyEmail?email=${user.email}'>link</a>.</p>
		<p>If you received this email by mistake, please simply ignore it.</p>`
	}

	await transporter.sendMail({
		from: '"Tiko the Admin" <tigrancho2000@gmail.com>', // sender address
		to: user.email, // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Welcome, " + user.name + ' ' + user.surname, // plain text body
		html: message, // html body
	});
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if(!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if(!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

userSchema.pre('save', async function (next) {
	const user = this;

	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next();
})

const User = mongoose.model('User', userSchema)

module.exports = User