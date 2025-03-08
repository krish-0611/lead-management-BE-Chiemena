const express = require('express');
const Lead = require('../models/Lead');
const router = express.Router();
const { validateLead } = require('../validation/leadValidation');
const validateRequest = require('../validation/validationMiddleware');

// POST /leads → Add a new lead
router.post('/', validateRequest(validateLead), async (req, res) => {
  try {
    const { name, email, status } = req.body;
    const newLead = new Lead({ name, email, status });
    await newLead.save();
    res.status(201).json({
      success: true,
      data: newLead,
      message: 'Lead created successfully'
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists',
        error: 'Duplicate email address'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error adding lead',
      error: err.message
    });
  }
});

// GET /leads → Fetch all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      success: true,
      data: leads,
      message: 'Leads fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching leads', 
      error: err.message 
    });
  }
});

// GET /leads/:id → Fetch a single lead
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead fetched successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching lead', 
      error: err.message 
    });
  }
});

// PUT /leads/:id → Update a lead
router.put('/:id', validateRequest(validateLead), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead updated successfully'
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists',
        error: 'Duplicate email address'
      });
    }
    res.status(400).json({ 
      success: false,
      message: 'Error updating lead', 
      error: err.message 
    });
  }
});

// DELETE /leads/:id → Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ 
        success: false,
        message: 'Lead not found' 
      });
    }
    res.status(200).json({ 
      success: true,
      message: 'Lead deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Error deleting lead', 
      error: err.message 
    });
  }
});

module.exports = router; 