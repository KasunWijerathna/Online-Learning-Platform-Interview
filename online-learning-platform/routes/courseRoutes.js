const express = require('express');
const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');
const Course = require('../models/Course');

const router = express.Router();

// Create a new course
router.post('/', authenticateJWT, authorizeAdmin, async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await Course.create({ title, description });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all courses
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a course by id
router.get('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course
router.put('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const course = await Course.findByPk(id);
    if (course) {
      course.title = title;
      course.description = description;
      await course.save();
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course
router.delete('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (course) {
      await course.destroy();
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
