import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  //lifecycle hook
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.topProject;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />

              {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  topProject: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

//1st arg of connect
const mapStateToProps = state => ({
  topProject: state.project //from index.js in reducers folder
});

//connect has 2 arguments, first one is to get the data from redux store, 2nd to send to redux store (ProjectActions.js dispatch)
export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
