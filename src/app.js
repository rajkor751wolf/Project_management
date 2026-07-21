import express from "express";
import cors from "cors";

const app = express();

//basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONs"],
  allowedHeaders: ["Authorization", "Content-Type"],
}),
);

//importing routes
import healthCheckRoutes from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck/", healthCheckRoutes);


app.get("/", (req, res) => {
  res.send("wlecome to project management application");
});

app.get("/instagram", (req, res) => {
  res.send("This is my instagram page");
});

export default app;