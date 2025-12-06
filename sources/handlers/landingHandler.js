const Articles = require('../models/articleModel');
const Projects = require('../models/projectModel');

const getArticles = async (req, res) => {
    try {
        const articles = await Articles.find().populate("author", "username");
        if(articles.length === 0) {
            return res.status(404).json({
                error: 'empty articles'
            });
        }
        return res.status(200).json({
            message: 'showing articles',
            articles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Articles.findOne({ id });
        if(!article) {
            return res.status(404).json({
                error: 'article not found'
            });
        }
        return res.status(200).json({
            message: 'showing article by its id',
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Projects.find().populate("author", "username");
        if(projects.length === 0) {
            return res.status(404).json({
                error: 'empty projects'
            });
        }
        return res.status(200).json({
            message: 'showing projects',
            projects
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Projects.findOne({ id });
        if(!project) {
            return res.status(404).json({
                error: 'project not found'
            });
        }
        return res.status(200).json({
            message: 'showing project by its id',
            project
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = { getArticles, getArticleById, getProjects, getProjectById };