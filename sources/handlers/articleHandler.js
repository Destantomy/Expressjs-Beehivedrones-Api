const Article = require('../models/articleModel');
const { v4: uuidv4 } = require('uuid');

const postUserArticle = async (req, res) => {
    try {
        if(!req.isUser) {
            return res.status(401).json({
                error: 'unauthorized'
            });
        }
        const id = `article-${uuidv4()}`;
        const { title, content } = req.body;
        if(!title || !content) {
            return res.status(400).json({
                error: 'please complete all fields'
            });
        }
        const exist = await Article.findOne({ title });
        if(exist) {
            return res.status(400).json({
                error: 'title already exist, is article already exist too?'
            });
        }
        const article = await Article.create({
            id: id,
            title,
            content,
            author: req.user._id
        });
        return res.status(201).json({
            message: 'article created',
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getUserArticle = async (req, res) => {
    try {
        if(!req.isUser) {
            return res.status(401).json({
                error: 'unauthorized'
            });
        }
        const userId = req.user._id;
        const articles = await Article.find({ author: userId }).populate("author", "username");
        return res.status(200).json({
            message: 'your articles',
            articles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getUserArticleById = async (req, res) => {
    try {
        if (!req.isUser) {
            return res.status(401).json({
                error: 'unauthorized'
            });
        }

        const { id } = req.params;

        const article = await Article.findOne({ id })
            .populate("author", "username");

        if (!article) {
            return res.status(404).json({
                error: 'article not found'
            });
        }
        if (!article.author._id.equals(req.user._id)) {
            return res.status(403).json({
                error: 'forbidden: you are not the author'
            });
        }

        return res.status(200).json({
            message: 'article found',
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
};


const updateUserArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const article = await Article.findOne({ id });
        if(!article) {
            return res.status(404).json({
                error: 'article not found'
            });
        }
        // const exist = await Article.findOne({ title });
        // if(exist) {
        //     return res.status(400).json({
        //         error: 'title already exist'
        //     });
        // }
        if(!article.author.equals(req.user._id)) {
            return res.status(403).json({
                error: 'forbidden: you are not the author'
            });
        }
        // updating article
        if(title) {
            article.title = title;
        }
        if(content) {
            article.content = content;
        }
        await article.save();
        return res.status(200).json({
            message: 'article updated',
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const deleteUserArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findOne({ id });
        if(!article) {
            return res.status(404).json({
                error: 'article not found',
            });
        }
        if(!article.author.equals(req.user._id)) {
            return res.status(403).json({
                error: 'forbidden: you are not the author'
            });
        }
        await article.deleteOne();
        return res.status(200).json({
            message: 'article deleted'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = { postUserArticle, getUserArticle, getUserArticleById, updateUserArticle, deleteUserArticle };