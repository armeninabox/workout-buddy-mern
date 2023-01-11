const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

// middleware
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// fa partire la funzione middleware prima di tutte le rotte che vogliamo proteggere
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET single workout
router.get('/:id', getWorkout);

// POST new workout
router.post('/', createWorkout);

// DELETE workout
router.delete('/:id', deleteWorkout);

// UPDATE workout
router.patch('/:id', updateWorkout);

module.exports = router;
