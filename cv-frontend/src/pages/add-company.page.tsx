import "./companies.scss";
import { useState } from "react";
import { ICreateCompanyDTO } from "../types/global.typing";
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

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDTO>({
    name: "",
    size: "",
  });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Please fill in all fields");
      return;
    }
    // Add company to the database
    httpModule
      .post("/Company/create", company)
      .then((res) => {
        redirect("/companies");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickCancelBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select
            value={company.size}
            label="Company Size"
            onChange={(e) => setCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
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

export default AddCompany;
