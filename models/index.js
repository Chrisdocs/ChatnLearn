const User = require('./users');
const LangSpk = require('./language_spoken');

// User.hasMany(Friends, {
//     foreignKey: 'user_id'
// });

module.exports = { User, LangSpk };