import {
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import HideIcon from "@mui/icons-material/Close";
import axios from "axios";

const SeekerApplicationPreview = ({ application, userId, setApplications }) => {
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const hideApplication = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/api/applications/seeker/${application.id}/${userId}/hide`
      );
      setApplications(response.data.applications);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Card elevation={1}>
      <CardContent>
        <Stack>
          <Typography variant="body1" color="primary">
            {application.jobId?.title} ({application.jobId?.jobType})
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontStyle: "uppercase !important" }}
          >
            <Chip
              label={application.status}
              sx={{ my: 0.5 }}
              size="small"
              variant="outlined"
              color={
                application.status === "Rejected"
                  ? "error"
                  : application.status === "Accepted"
                  ? "success"
                  : "primary"
              }
            />
          </Typography>
          <Typography variant="caption">
            {application.jobId?.postedBy?.companyName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="caption">
            <span style={{ fontWeight: 500 }}>Due date: </span>
            {moment(application.jobId?.dueDate).format("DD/MM/YYYY")}{" "}
          </Typography>
          <Typography variant="caption">
            <span style={{ fontWeight: 500 }}>Applied on: </span>
            {moment(application.createdAt).format("DD/MM/YYYY")}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SeekerApplicationPreview;
