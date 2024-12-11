import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SinglePage from "./components/SinglePage";
import AddBook from "./routes/AddBook";
import Book from "./routes/Book";
import Books from "./routes/Books";
import Root from "./routes/Root";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#ffab40",
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Books /> },
        { path: "/book", element: <Book /> },
        { path: "/addnew", element: <AddBook /> },
        { path: "books/:id", element: <SinglePage /> },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
