import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { completeTask, deleteTask, readTasks } from './todoistSlice';

class TodoistWidget extends Component {
  componentDidMount() {
    this.props.readTasks();
  }
  handleChange(e) {
    this.props.completeTask(e.target.value);
  }
  handleDelete(id) {
    this.props.deleteTask(id);
  }
  render() {
    return (
      <TaskList
        tasks={this.props.tasks}
        project={this.props.activeProject}
        onChange={(e) => this.handleChange(e)}
        onDelete={(e) => this.handleDelete(e)}
      />
    );
  }
}

function TaskList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.tasks
        .filter((t) => t.project_id === props.project)
        .sort((a, b) => (a.order < b.order ? 1 : -1))
        .map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => props.onChange(e)}
                value={task.id}
              />{' '}
              {task.content}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => props.onDelete(task.id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => props.onDelete(task.id)}
              />
            </button>
          </li>
        ))}
    </ul>
  );
}

export default TodoistWidget = connect(
  (state) => ({
    projects: state.todoist.projects,
    tasks: state.todoist.tasks,
    activeProject: state.todoist.activeProject,
  }),
  (dispatch) => ({
    completeTask: (taskId) => dispatch(completeTask(taskId)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    readTasks: () => dispatch(readTasks()),
  }),
)(TodoistWidget);
