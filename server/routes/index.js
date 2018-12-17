const user = require('./user')
const ticket = require('./ticket')
module.exports = (router) => {
    user(router)
    ticket(router)
}