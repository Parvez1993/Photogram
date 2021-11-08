import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signin from "./pages/Signin";
import NavbarBootstrap from "./component/Navbar";
import "semantic-ui-css/semantic.min.css";
import Dashboard from "./component/Dashboard";
import SinglePic from "./component/SinglePic";
import PrivateRoute from "./component/PrivateRouter";

function App() {
  return (
    <BrowserRouter>
      <NavbarBootstrap />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:slug" element={<SinglePic />} /> */}

        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
