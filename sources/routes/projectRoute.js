const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { postUserProject, getUserProject, getUserProjectById, updateUserProject, deleteUserProject } = require('../handlers/projectHandler');

router.use(requireAuth);
router.post('/userProject', postUserProject);
router.get('/userProject', getUserProject);
router.get('/userProject/:id', getUserProjectById);
router.put('/userProject/:id', updateUserProject);
router.delete('/userProject/:id', deleteUserProject);

module.exports = router;