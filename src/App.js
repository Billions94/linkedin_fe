import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import MyProfile from "./components/Profiles/MyProfile/Profile";
import MyFooter from "./components/Footer/MyFooter";
import Home from "./components/Home/Home";
import {useState, useEffect} from "react"

function App() {

    const [currentUser, setCurrentUser] = useState({})
   

    useEffect(() => {
      console.log(`i am the currentUser`,currentUser)
    },[currentUser])

  return (
    <div className="App">
    <Router>
      <NavBar currentUser={currentUser} />
      <Route path="/home" exact component={Home} />
      <Route path="/profile/:id" exact render={(props) => <MyProfile {...props} setCurrentUser={setCurrentUser} />} />
      <MyFooter />
    </Router>
    </div>
  );
}

export default App;
