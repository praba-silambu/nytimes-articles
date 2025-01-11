import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import ArticleDetail from "../ArticleDetail";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
        );
        setArticles(response.data.results);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [period]);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedArticle(null);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ mt: 4, color: "#1976d2" }}
      >
        NY Times Most Popular Articles
      </Typography>

      <Box
        mb={3}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ gap: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPeriod(1)}
          sx={{ px: 4, width: { xs: "100%", sm: "auto" } }}
        >
          Last 1 Day
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPeriod(7)}
          sx={{ px: 4, width: { xs: "100%", sm: "auto" } }}
        >
          Last 7 Days
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => setPeriod(30)}
          sx={{ px: 4, width: { xs: "100%", sm: "auto" } }}
        >
          Last 30 Days
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {articles.map((article) => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                  <Card sx={{ boxShadow: 3, borderRadius: 2, height: "100%" }}>
                    <CardMedia
                      component="img"
                      alt={article.title}
                      height="180"
                      image={
                        article.media &&
                        article.media[0] &&
                        article.media[0]["media-metadata"] &&
                        article.media[0]["media-metadata"][2]?.url
                      }
                    />
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {article.abstract}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="flex-end" p={2}>
                      <IconButton
                        aria-label="Close"
                        onClick={() => handleOpenModal(article)}
                        color="primary"
                      >
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {selectedArticle && (
            <Grid item xs={12} md={4}>
              <ArticleDetail article={selectedArticle} />
            </Grid>
          )}
        </Grid>
      )}

      <Box mb={6} />

      <Box
        sx={{
          backgroundColor: "#1976d2",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="white">
          © 2025 NY Times Popular Articles. All rights reserved.
        </Typography>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedArticle?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            {selectedArticle?.abstract}
          </Typography>
          <Typography variant="body1">
            <strong>Published Date:</strong> {selectedArticle?.published_date}
          </Typography>
          <Typography variant="body1">
            <strong>Source:</strong> {selectedArticle?.source}
          </Typography>
          <Typography variant="body1">
            <strong>URL:</strong>{" "}
            <a
              href={selectedArticle?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedArticle?.url}
            </a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Articles;
