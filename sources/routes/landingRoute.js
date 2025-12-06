const express = require('express');
const router = express.Router();
const { getArticles, getArticleById, getProjects, getProjectById } = require('../handlers/landingHandler');

router.get('/getArticles', getArticles);
router.get('/getArticles/:id', getArticleById);
router.get('/getProjects', getProjects);
router.get('/getProjects/:id', getProjectById);

module.exports = router;