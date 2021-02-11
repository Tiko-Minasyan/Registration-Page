const mongoose = require('mongoose');
const validator = require('validator')

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
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User