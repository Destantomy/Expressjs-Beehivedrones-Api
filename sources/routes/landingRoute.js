const express = require('express');
const router = express.Router();
const { getArticles, getProjects } = require('../handlers/landingHandler');

router.get('/getArticles', getArticles);
router.get('/getProjects', getProjects);

module.exports = router;