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
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    // Basic fields
    if (req.body.projectName)    project.projectName    = req.body.projectName;
    if (req.body.description)    project.description    = req.body.description;
    if (req.body.githubLink)     project.githubLink     = req.body.githubLink;
    if (req.body.deploymentLink) project.deploymentLink = req.body.deploymentLink;

    // Arrays — sent as JSON strings from FormData
    if (req.body.languages) {
      project.languages = JSON.parse(req.body.languages);
    }
    if (req.body.tags) {
      project.tags = JSON.parse(req.body.tags);
    }

    // Design config — sent as JSON string from FormData
    if (req.body.designConfig) {
      project.designConfig = {
        ...project.designConfig,
        ...JSON.parse(req.body.designConfig),
      };
    }

    // New image — only upload if a file was actually attached
    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: "/portfolio-projects",
      });
      project.image = uploadedImage.url;
    }

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};