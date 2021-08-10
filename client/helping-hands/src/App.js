import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "./Home.js"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
