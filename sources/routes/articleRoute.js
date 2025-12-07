const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { postUserArticle, getUserArticle, getUserArticleById, updateUserArticle, deleteUserArticle } = require('../handlers/articleHandler');

router.use(requireAuth);
router.post('/userArticle', postUserArticle);
router.get('/userArticle', getUserArticle);
router.get('/userArticle/:id', getUserArticleById);
router.put('/userArticle/:id', updateUserArticle);
router.delete('/userArticle/:id', deleteUserArticle);

module.exports = router;