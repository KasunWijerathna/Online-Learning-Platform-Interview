const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Create course
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = await Course.create({ title, description });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read course by id
router.get('/:id', async (req, res) => {
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

// Update course
router.put('/:id', async (req, res) => {
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

// Delete course
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (course) {
      await course.destroy();
      res.json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
