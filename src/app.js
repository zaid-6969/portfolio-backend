import express from "express";
import cors from "cors";

import authRoutes from "./router/auth.routes.js";
import projectRoutes from "./router/project.routes.js";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://portfolio-backend-vyl5.onrender.com/",
  // "https://portfolio-backend-livid-eight.vercel.app",
  "https://portfolio-chi-virid-10.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(
            `CORS policy: Origin ${origin} not allowed`
          )
        );
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

export default app;