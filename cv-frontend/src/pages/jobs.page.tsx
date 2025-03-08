import React, { useEffect, useState } from "react";
import { IJob } from "../types/global.typing";
import { useNavigate } from "react-router-dom";
import httpModule from "../helpers/http.module";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import JobsGrid from "../components/jobsGrid.component";
import "./jobs.scss";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/get")
      .then((res) => {
        console.log(res);
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button
          variant="outlined"
          onClick={() => redirect("/jobs/add")}
        >
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : jobs.length === 0 ? (
        <h1>No jobs</h1>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
};

export default Jobs;
