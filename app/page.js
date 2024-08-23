"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/material";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";

export default function Home() {
  const handleSubmit = async (planType) => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
      body: JSON.stringify({ planType }),
    });
    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title> FlashMind AI</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {" "}
            FlashMind AI
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              {" "}
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              {" "}
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FlashMind AI
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Create AI-generated flashcards with ease!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Visualize your progress</Typography>
            <Typography>
              {" "}
              Track your progress for all flashcard sets with daily monitor.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Smart Flashcards</Typography>
            <Typography>
              {" "}
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for studying.{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Space Repetition </Typography>
            <Typography>
              {" "}
              Using the latest learning science, these flashcards utilize spaced
              repetition for optimal learning.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Pricing plans */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5"> Basic </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $5 / month
              </Typography>
              <Typography>
                {" "}
                Access to basic flashcard features and limited storage.{" "}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit("basic")}
              >
                Choose basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5"> Pro </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $10 / month
              </Typography>
              <Typography>
                {" "}
                Unlimited flashcards and storage, and access to more
                graphs/charts (i.e. Heatmap).{" "}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleSubmit("pro")}
              >
                Choose pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
