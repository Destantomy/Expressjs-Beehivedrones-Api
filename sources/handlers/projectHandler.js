const Project = require('../models/projectModel');
const { v4: uuidv4 } = require('uuid');

const postUserProject = async (req, res) => {
    try {
        if(!req.isUser) {
            return res.status(401).json({
                error: 'unauthorized'
            });
        }
        const id = `project-${uuidv4()}`;
        const { title, description, tools } = req.body;
        if(!title || !description || !tools) {
            return res.status(400).json({
                error: 'please complete all field'
            });
        }
        const exist = await Project.findOne({ title });
        if(exist) {
            return res.status(400).json({
                error: 'title already exist, is project already exist too?'
            });
        }
        const project = await Project.create({
            id: id,
            title,
            description,
            tools,
            author: req.user.id
        });
        return res.status(201).json({
            message: 'project created',
            project
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const getUserProject = async (req, res) => {
    try {
        if(!req.isUser) {
            return res.status(401).json({
                error: 'unauthorized'
            });
        }
        const userId = req.user.id;
        const projects = await Project.find({ author: userId });
        return res.status(200).json({
            message: 'your projects',
            projects
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const updateUserProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tools } = req.body;
        const project = await Project.findOne({ id });
        if(!project) {
            return res.status(404).json({
                error: 'project not found'
            });
        }
        const exist = await Project.findOne({ title });
        if(exist) {
            return res.status(400).json({
                error: 'title already exist'
            });
        }
        if(project.author !== req.user.id) {
            return res.status(403).json({
                error: 'forbidden: you are not the author'
            });
        }
        // updating project
        if(title) {
            project.title = title;
        }
        if(description) {
            project.description = description
        }
        if(tools) {
            project.tools = tools;
        }
        await project.save();
        return res.status(200).json({
            message: 'project updated',
            project
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

const deleteUserProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ id });
        if(!project) {
            return res.status(404).json({
                error: 'project not found'
            });
        }
        if(project.author !== req.user.id) {
            return res.status(403).json({
                error: 'forbidden: you are not the author'
            });
        }
        await project.deleteOne();
        return res.status(200).json({
            message: 'project deleted'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}

module.exports = { postUserProject, getUserProject, updateUserProject, deleteUserProject };