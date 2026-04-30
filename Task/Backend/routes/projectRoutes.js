const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../config/db");

router.post("/", auth, async (req, res) => {
  const { name } = req.body;
  const project = await db.query(
    "INSERT INTO projects(name,created_by) VALUES($1,$2) RETURNING *",
    [name, req.user.id]
  );
  res.json(project.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const projects = await db.query("SELECT * FROM projects");
  res.json(projects.rows);
});

module.exports = router;