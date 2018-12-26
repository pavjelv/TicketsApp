const user = require('./user')
const ticket = require('./ticket')
const express = require('express')
const router = express.Router()

router.use('/api', require('./api'))

module.exports = router;

// module.exports = (router) => {
//     user(router)
//     ticket(router)
// }