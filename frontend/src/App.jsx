import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBooks from "./pages/AddBooks";
import GetBooks from "./pages/GetBooks";
import EditBooks from "./pages/EditBooks";
import DeleteBooks from "./pages/DeleteBooks";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<AddBooks />} />
        <Route path="/books/details/:id" element={<GetBooks />} />
        <Route path="/books/edit/:id" element={<EditBooks />} />
        <Route path="/books/delete/:id" element={<DeleteBooks />} />
      </Routes>
    </>
  );
};

export default App;
