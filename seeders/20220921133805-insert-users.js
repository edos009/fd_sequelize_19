const _ = require('lodash');

const generateUser = key => ({
  first_name: `Name${key}`,
  last_name: `LastName${key}`,
  email: `email${key}@gmail.com`,
  password_hash: `pass${key}`,
  birthday: new Date(1980, 0, key),
  is_male: _.random(1, 10) > 5,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 50) => {
  return new Array(amount).fill(null).map((elem, i) => generateUser(i));
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(100), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
