import "./companies.scss";
import { useState, useEffect } from "react";
import { ICreateJobDTO, ICompany } from "../types/global.typing";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../helpers/http.module";

const levelsArray = [
  "Intern",
  "Junior",
  "Mid",
  "Senior",
  "TeamLead",
  "CTO",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDTO>({
    title: "",
    level: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Please fill in all fields");
      return;
    }
    // Add job to the database
    httpModule
      .post("/Job/create", job)
      .then((res) => {
        redirect("/jobs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickCancelBtn = () => {
    redirect("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Job</h2>
        <TextField
          autoComplete="off"
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Job Level</InputLabel>
          <Select
            value={job.level}
            label="Job Level"
            onChange={(e) => setJob({ ...job, level: e.target.value })}
          >
            {levelsArray.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Company</InputLabel>
          <Select
            value={job.companyId}
            label="Company"
            onChange={(e) => setJob({ ...job, companyId: e.target.value })}
          >
            {companies.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClickCancelBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
