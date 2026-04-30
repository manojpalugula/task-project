const pool = require("../config/db");
const bcrypt = require("bcrypt");
const token = require("../utils/token");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [name, email, hash]
  );

  res.json({ token: token(user.rows[0]) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!user.rows.length) return res.status(400).json({ msg: "No user" });

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  res.json({ token: token(user.rows[0]) });
};