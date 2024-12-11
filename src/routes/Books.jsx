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
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useAxios from "../services/useAxios";

/**
 * Books component displays a grid of book cards
 * Shows book information including cover image, title, author, and rating
 * @returns {JSX.Element} A responsive grid of book cards
 */
function Books() {
  const apiURL = "http://localhost:3000";
  const { data, alert, loading, get } = useAxios(apiURL);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data.length === 0) {
      getBooks();
    }
  }, []);

  const filteredBooks = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return data; // Return all books if search is empty

    return data.filter((book) => {
      const matchesTitle = book.name.toLowerCase().includes(searchTerm);
      const matchesAuthor = book.author.toLowerCase().includes(searchTerm);
      const matchesGenre = book.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm)
      );

      return matchesTitle || matchesAuthor || matchesGenre;
    });
  }, [data, search]);

  /**
   * Fetches books data from the server
   * @async
   * @throws {Error} When the API request fails
   */

  async function getBooks() {
    try {
      await get("books");
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            mb={2}
          >
            <TextField
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks?.map((book) => (
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
