const db = require('../database/models/index');
const User = db.User;

async function getUsers() {
    try {
        const users = await User.findAll({raw: true });
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
}

module.exports = getUsers