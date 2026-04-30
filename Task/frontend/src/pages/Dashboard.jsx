import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1>Dashboard</h1>
      <p>Total: {data.total}</p>
      <p>Completed: {data.completed}</p>
      <p>Pending: {data.pending}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  );
}