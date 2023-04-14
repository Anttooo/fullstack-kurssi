const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	// get the user object from the database so that we can check the password
	const user = await User.findOne({ username })

	// use bcrypt.compare to check if the password is correct
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)
	
	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}
	const token = await jwt.sign(userForToken, process.env.SECRET)

	response
		.status(200)
		.send({token, username: user.username, name: user.name })
})

module.exports = loginRouter