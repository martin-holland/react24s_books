import { Stack, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState } from "react";
import { bookGenres } from "../genres";
import useAxios from "../services/useAxios";

/**
 * AddBook component handles the creation of new book entries
 * Uses Material-UI components for form elements and layout
 * @returns {JSX.Element} A form for adding new books
 */
function AddBook() {
  const { alert, post } = useAxios("http://localhost:3001");
  const [rateValue, setRateValue] = useState(3);
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  /**
   * Handles changes to the genre selection
   * @param {Object} event - The change event from the genre select component
   */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  /**
   * Handles changes to the star rating
   * @param {Object} event - The change event from the rating component
   */
  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  /**
   * Updates book state based on form input changes
   * @param {Object} e - The change event from form inputs
   */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox" && name === "completed") {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  /**
   * Submits the book data to the server
   * Uses the post method from useAxios hook
   */
  function postHandler() {
    post("books", book);
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: "auto", width: "25%" }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            "& .MuiRating-root": {
              padding: "10px", // Add padding around the stars
              "& .MuiRating-icon": {
                padding: "3px", // Add spacing between stars
                cursor: "pointer",
              },
              "& .MuiRating-iconEmpty": {
                color: "rgba(0,0,0,0.2)", // Make empty stars more visible
              },
            },
          }}
        >
          <Rating
            name="stars"
            value={rateValue}
            precision={1}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
              setBook({ ...book, stars: newValue });
            }}
            onChangeActive={(event, newHover) => {
              setBook({ ...book, stars: newHover });
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {rateValue !== null ? `${rateValue} stars` : "Hover to rate"}
          </Typography>
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
