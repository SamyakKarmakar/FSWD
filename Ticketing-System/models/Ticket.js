const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Open' },
  user: { type: String, required: true } // Username of the ticket creator
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
