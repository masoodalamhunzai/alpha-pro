import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

function EditUser() {
  return (
    <div>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#F5F5F5",
        }}
        className="shadow-md"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Edit User Form</Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="First name"
              label="first Name"
              type="text"
              id="name"
              autoComplete="current-password"
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Last name"
              label="Last Name"
              type="text"
              id="name"
              autoComplete="current-password"
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Phone"
              label="Phone"
              type="number"
              id="name"
              autoComplete="current-password"
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="organization"
              label="organization"
              type="text"
              id="organization"
              autoComplete="current-organization"
              sx={{
                backgroundColor: "#fff",
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: "20px",
                  backgroundColor: "#3287FB",
                }}
                className="rounded-xl"
              >
                {" "}
                continue
              </Button>
              <Button
                type="continue"
                // fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: "20px",
                  backgroundColor: "#ACACAC",
                  fontWeight: "700",
                }}
                className="rounded-xl"
              >
                cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default EditUser;
