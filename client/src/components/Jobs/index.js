import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Intro from "./Intro";
import { jobCategories, salaryRanges, jobTypes } from "../../assets/dataArrays";
import axios from "axios";
import JobResult from "./JobResult";

const Jobs = () => {
  const classes = useStyles();

  //Ui states
  const [jobCategory, setJobCategory] = useState("All");

  const [jobType, setJobType] = useState("All");

  const [salaryRange, setSalaryRange] = useState("All");

  const clearFilters = (e) => {
    e.preventDefault();
    setJobCategory("All");
    setJobType("All");
    setSalaryRange("All");
  };

  // data states
  const [jobs, setJobs] = useState([]);

  const fetchJobsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/jobs?jobCategory=${jobCategory}&jobType=${jobType}&salaryRange=${salaryRange}`
      );
      const data = response.data.jobs;
      setJobs(data);
      console.log(data);
      console.log(jobCategory, salaryRange, jobType);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, [jobCategory, jobType, salaryRange]);

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Intro />
        <Typography variant="h6" mt={3}>
          Filters
        </Typography>
        <form className={classes.searchControls}>
          <TextField
            name="jobCategory"
            type="text"
            select
            label="Category"
            variant="outlined"
            size="small"
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
            sx={{ flexGrow: 2, flexBasis: 2 }}
          >
            {jobCategories.map((jobCategory, index) => (
              <MenuItem key={index} value={jobCategory}>
                {jobCategory}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="jobType"
            type="text"
            select
            label="Job Type"
            variant="outlined"
            size="small"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 1 }}
          >
            {jobTypes.map((jobType) => (
              <MenuItem key={jobType} value={jobType}>
                {jobType}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="salaryRange"
            type="text"
            select
            label="Salary Range"
            variant="outlined"
            size="small"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            sx={{ flexGrow: 1, flexBasis: 1 }}
          >
            {salaryRanges.map((salaryRange) => (
              <MenuItem key={salaryRange} value={salaryRange}>
                {salaryRange}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" disableElevation onClick={clearFilters}>
            Clear
          </Button>
        </form>
        <Box className={classes.jobsContainer}>
          <Box className={classes.numberOfResults}>
            {jobs.length === 1 ? (
              <Typography variant="h6" align="center" sx={{ color: "white" }}>
                1 Open Job
              </Typography>
            ) : (
              <Typography variant="h6" align="center" sx={{ color: "white" }}>
                {`${jobs.length} Open Jobs`}
              </Typography>
            )}
          </Box>
          <Box className={classes.jobDisplay}>
            {jobs?.length > 0 ? (
              jobs.map((job) => <JobResult key={job._id} job={job} />)
            ) : (
              <Typography mt={2} align="center">
                No jobs to show.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Jobs;
