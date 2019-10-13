import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {
            // Private Routes
          }

          <Route exacpt path="/dashboard" component={Dashboard} />
          <Route exacpt path="/addProject" component={AddProject} />
          <Route exacpt path="/UpdateProject/:id" component={UpdateProject} />
          <Route exacpt path="/projectBoard/:id" component={ProjectBoard} />
          <Route exacpt path="/addProjectTask/:id" component={AddProjectTask} />
          <Route
            exacpt
            path="/UpdateProjectTask/:backlogId/:ptid"
            component={UpdateProjectTask}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
