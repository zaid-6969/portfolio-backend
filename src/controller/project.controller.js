import Project from "../models/Project.model.js";
import { imagekit } from "../config/imagekit.js";

export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      githubLink,
      deploymentLink,
      languages,
      tags,
      createdBy,
      designConfig,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Project image is required",
      });
    }

    const uploadedImage = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/portfolio-projects",
    });

    const project = await Project.create({
      projectName,
      description,
      image: uploadedImage.url,
      githubLink,
      deploymentLink,
      languages: JSON.parse(languages),
      tags: JSON.parse(tags),
      createdBy,
      designConfig: JSON.parse(designConfig),
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    project.projectName = req.body.projectName || project.projectName;

    project.description = req.body.description || project.description;

    project.githubLink = req.body.githubLink || project.githubLink;

    project.deploymentLink = req.body.deploymentLink || project.deploymentLink;

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
