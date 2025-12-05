const Articles = require('../models/articleModel');
const Projects = require('../models/projectModel');

const getArticles = async (req, res) => {
    try {
        const articles = await Articles.find();
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

const getProjects = async (req, res) => {
    try {
        const projects = await Projects.find();
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

module.exports = { getArticles, getProjects };