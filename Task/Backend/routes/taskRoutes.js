const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../config/db");

router.post("/", auth, async (req, res) => {
  const { title, projectId } = req.body;

  const task = await db.query(
    "INSERT INTO tasks(title,project_id,created_by) VALUES($1,$2,$3) RETURNING *",
    [title, projectId, req.user.id]
  );

  res.json(task.rows[0]);
});

router.get("/", auth, async (req, res) => {
  const tasks = await db.query("SELECT * FROM tasks");
  res.json(tasks.rows);
});

router.put("/:id", auth, async (req, res) => {
  const { status } = req.body;

  const task = await db.query(
    "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
    [status, req.params.id]
  );

  res.json(task.rows[0]);
});

module.exports = router;