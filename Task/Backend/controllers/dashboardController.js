const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status='done') AS completed,
      COUNT(*) FILTER (WHERE status!='done') AS pending,
      COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status!='done') AS overdue
    FROM tasks
  `);

  res.json(result.rows[0]);
};