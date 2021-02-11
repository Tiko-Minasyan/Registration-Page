const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
		default: 0,
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

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'secrettokenforregistration')

	user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if(!user) {
		throw new Error('Unable to login')
	}

	if(password !== user.password) {
		throw new Error('Wrong password')
	}

	return user
}

const User = mongoose.model('User', userSchema)

module.exports = User