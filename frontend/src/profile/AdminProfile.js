import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getAdminData } from "../api-helpers/api-helpers";

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onResReceived = (res) => {
    if (res && res.admin) {
      setAdmin(res.admin);
    } else {
      setError("No admin data found.");
    }
    setLoading(false);
  };

  const onError = (err) => {
    console.error("Error fetching admin data:", err);
    setError("Failed to fetch admin data.");
    setLoading(false);
  };

  useEffect(() => {
    getAdminData()
      .then(onResReceived)
      .catch(onError);
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box width="100%" display={"flex"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
        <Typography
          padding={1}
          width="200px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Email: {admin?.email || "N/A"} 
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Added Movies
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin?.addedMovies?.length > 0 ? (
              admin.addedMovies.map((movie, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Movie: {movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Releasing: {new Date(movie.releaseDate).toDateString()}
                  </ListItemText>
                </ListItem>
              ))
            ) : (
              <Typography>No movies added yet.</Typography>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
