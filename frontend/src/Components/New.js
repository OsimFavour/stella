import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"
import "../App.css"
import img1 from './Assets/img1.jpg'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      {/* <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">RealEstate Pro</Typography>
        </Toolbar>
      </AppBar> */}

      <main>
        <Paper
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <Container>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography
                variant="h2"
                color="textPrimary"
                style={{ fontWeight: "bold", marginBottom: "16px", marginTop: '10px' }}
              >
                Find Your Dream Home
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Discover the best properties in your area.
              </Typography>
              <Button
                variant="contained"
                size="large"
                style={{ marginTop: "16px" }}
              >
                List Properties
              </Button>
            </Box>
          </Container>
        </Paper>
      </main>
    </div>
  );
}

export default App;
