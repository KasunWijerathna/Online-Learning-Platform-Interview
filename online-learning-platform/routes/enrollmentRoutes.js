const express = require('express');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

// Create enrollment
router.post('/', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const enrollment = await Enrollment.create({ userId, courseId });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read enrollment by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update enrollment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, courseId } = req.body;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      enrollment.userId = userId;
      enrollment.courseId = courseId;
      await enrollment.save();
      res.json(enrollment);
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      await enrollment.destroy();
      res.json({ message: 'Enrollment deleted' });
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
