import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Chip,
  CircularProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Books component displays a grid of book cards
 * Shows book information including cover image, title, author, and rating
 * @returns {JSX.Element} A responsive grid of book cards
 */
function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, []);

  /**
   * Fetches books data from the server
   * @async
   * @throws {Error} When the API request fails
   */

  async function getBooks() {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {books.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
