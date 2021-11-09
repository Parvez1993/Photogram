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
import Signup from "./pages/Signup";
import { useAuth } from "./component/Context";
import Gallery from "./component/Gallery";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <NavbarBootstrap />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:slug" element={<SinglePic />} /> */}

        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/dashboard/:slug" element={<PrivateRoute />}>
          <Route exact path="/dashboard/:slug" element={<SinglePic />} />
        </Route>
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
