import { Star } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
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
  const [hover, setHover] = useState(-1);
  const labels = {
    0: "0",
    1: "1+",
    2: "2+",
    3: "3",
    4: "4",
    5: "5",
  };

  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };

  const rateChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      stars: value,
    });
  };

  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox" && name === "completed") {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

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
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            onClick={rateChangeHandler}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          >
            {rateValue !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : rateValue]}
              </Box>
            )}
          </Rating>
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
