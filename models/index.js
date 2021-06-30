const User = require('./User');
const LangSpk = require('./language_spoken');
const Friends = require('./friends')

// User.hasMany(Friends, {
//     foreignKey: 'user_id'
// });

module.exports = { User, LangSpk, Friends };