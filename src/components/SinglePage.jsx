import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../services/useAxios";

const SinglePage = () => {
  const { id } = useParams();
  const apiURL = "http://localhost:3000";
  const { data: books, loading, error, get } = useAxios(apiURL);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    try {
      await get("books");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!books) return <div>No books data available</div>;

  const book = books.find((book) => book.id === parseInt(id));
  if (!book) return <div>No book found</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        {book.img ? (
          <CardMedia
            component="img"
            height="400"
            image={book.img}
            alt={book.name}
            sx={{ objectFit: "contain" }}
          />
        ) : (
          <Box
            sx={{
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.200",
            }}
          >
            <AutoStoriesIcon sx={{ fontSize: 100 }} />
          </Box>
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book.name}
          </Typography>
          <Typography variant="h6">Author: {book.author}</Typography>
          <Typography variant="body1">
            Genres: {book.genres.join(", ")}
          </Typography>
          <Typography variant="body1">Rating: {book.stars}/5</Typography>
          {book.start && (
            <Typography variant="body1">
              Started: {new Date(book.start).toLocaleDateString()}
            </Typography>
          )}
          {book.end && (
            <Typography variant="body1">
              Finished: {new Date(book.end).toLocaleDateString()}
            </Typography>
          )}
          <Typography variant="body1">
            Status: {book.completed ? "Completed" : "In Progress"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SinglePage;
