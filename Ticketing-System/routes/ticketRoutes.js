const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

//Dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  try {
    let tickets = [];
    let isAdmin = false;

    if (req.session.role === 'admin') {
      tickets = await Ticket.find();
      isAdmin = true;
    } else if (req.session.role === 'customer') {
      tickets = await Ticket.find({ createdBy: req.session.username });
    }

    // Pass preprocessed data to the template
    res.render('dashboard', {
      username: req.session.username,
      tickets,
      isAdmin,
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.render('dashboard', { error: 'Error loading tickets' });
  }
});


// Create Ticket
router.get('/create-ticket', (req, res) => {
  if (!req.session.username) return res.redirect('/login');
  res.render('createTicket');
});

router.post('/create-ticket', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.render('createTicket', { error: 'All fields are required' });
  }

  try {
    const ticket = new Ticket({ title, description, user: req.session.username });
    await ticket.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.render('createTicket', { error: 'Error creating ticket, try again' });
  }
});

//edit ticket
router.get('/edit-ticket/:id', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId); // Find ticket by ID

    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }

    // Preprocess status for easier conditional rendering in HBS
    const statusOpen = ticket.status === 'open' ? 'selected' : '';
    const statusInProgress = ticket.status === 'in-progress' ? 'selected' : '';
    const statusClosed = ticket.status === 'closed' ? 'selected' : '';

    // Pass the ticket data along with the preprocessed status
    res.render('editTicket', { ticket, statusOpen, statusInProgress, statusClosed });
  } catch (error) {
    console.error('Error retrieving ticket:', error);
    res.status(500).send('Error retrieving ticket');
  }
});

router.post('/edit-ticket/:id', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  try {
    const ticketId = req.params.id;
    const { title, description, status } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }

    ticket.title = title;
    ticket.description = description;
    ticket.status = status;

    await ticket.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).send('Error updating ticket');
  }
});

router.post('/delete-ticket/:id', async (req, res) => {
  if (!req.session.username) {
    return res.redirect('/login');
  }

  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).send('Error deleting ticket');
  }
});

module.exports = router;
