import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    githubLink: { type: String },
    deploymentLink: { type: String },
    languages: [String],
    tags: [String],
    createdBy: { type: String, default: "Admin" },

    designConfig: {
      // Colors
      backgroundColor:  { type: String, default: "#0f172a" },
      textColor:        { type: String, default: "#e2e8f0" },
      buttonColor:      { type: String, default: "#6366f1" },
      buttonTextColor:  { type: String, default: "#ffffff" },
      tagColor:         { type: String, default: "#6366f1" },

      // Title typography
      titleFontSize:    { type: String, default: "2rem" },
      titleFontWeight:  { type: String, default: "800" },
      titleFontFamily:  { type: String, default: "Syne, sans-serif" },

      // Description typography
      descFontSize:     { type: String, default: "1rem" },
      descFontFamily:   { type: String, default: "DM Sans, sans-serif" },
      descFontWeight:   { type: String, default: "400" },

      // Tags
      tagFontSize:      { type: String, default: "0.75rem" },

      // Layout
      borderRadius:     { type: String, default: "16px" },
      boxShadow:        { type: String, default: "0px 20px 60px rgba(0,0,0,0.4)" },
      border:           { type: String, default: "1px solid rgba(255,255,255,0.08)" },
      padding:          { type: String, default: "32px" },

      // Image
      imageSize:        { type: String, default: "full" },    // full|large|medium|small|hidden
      imagePosition:    { type: String, default: "top" },     // top|bottom|left|right
      imageHeight:      { type: String, default: "400" },

      // Legacy compat
      fontSize:         { type: String, default: "16px" },
      accentColor:      { type: String, default: "#6366f1" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);