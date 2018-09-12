const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	date: {
		type: Sequelize.DATE
	},
	totalPrice: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: { min: 0 }
	}
});
module.exports = Order;
