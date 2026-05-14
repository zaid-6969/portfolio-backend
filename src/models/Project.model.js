import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    githubLink: {
      type: String,
    },

    deploymentLink: {
      type: String,
    },

    languages: [String],

    tags: [String],

    createdBy: {
      type: String,
      default: "Admin",
    },

    designConfig: {
      backgroundColor: {
        type: String,
        default: "#ffffff",
      },

      textColor: {
        type: String,
        default: "#000000",
      },

      fontSize: {
        type: String,
        default: "16px",
      },

      borderRadius: {
        type: String,
        default: "10px",
      },

      boxShadow: {
        type: String,
        default: "0px 4px 10px rgba(0,0,0,0.1)",
      },

      border: {
        type: String,
        default: "none",
      },

      padding: {
        type: String,
        default: "20px",
      },

      cardWidth: {
        type: String,
        default: "100%",
      },
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Project", projectSchema);
