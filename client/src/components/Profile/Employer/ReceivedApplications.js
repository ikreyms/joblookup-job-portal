import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../styles";
import axios from "axios";
import { useSelector } from "react-redux";
import EmployerApplicationPreview from "./EmployerApplicationPreview";

const ReceivedApplications = () => {
  const classes = useStyles();

  const empId = useSelector((state) => state.user?.id);

  const [applications, setApplications] = useState([]);

  console.log(empId);
  const getReveivedApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2900/api/applications/${empId}/employer`
      );
      setApplications(response.data.applications);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getReveivedApplications();
  }, []);

  return (
    <Box className={classes.panelWrapper}>
      <Typography variant="h5">Received Applications</Typography>

      <Typography variant="body1" mb={2}>
        Received applications are displayed here.
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }} />

      {applications?.length > 0 ? (
        <Stack spacing={1}>
          {applications.map((application, index) => (
            <EmployerApplicationPreview key={index} application={application} />
          ))}
        </Stack>
      ) : (
        "You have not received any applications."
      )}
    </Box>
  );
};

export default ReceivedApplications;