import { Component } from 'react';
import { connect } from 'react-redux';
import {
  completeTask,
  readTasks,
} from './todoistSlice';

class TodoistWidget extends Component {
  componentDidMount() {
    this.props.readTasks();
  }
  handleChange(e) {
    this.props.completeTask(e.target.value);
  }
  render() {
    return (
      <TaskList tasks={this.props.tasks} project={this.props.activeProject} onChange={e => this.handleChange(e)} />
    );
  }
}

function TaskList(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.tasks.filter(t => t.project_id === props.project).sort((a, b) => a.order < b.order ? 1 : -1).map(task => (
        <li key={task.id} className="list-group-item">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={e => props.onChange(e)} value={task.id} /> {task.content}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoistWidget = connect(
  state => ({
    projects: state.todoist.projects,
    tasks: state.todoist.tasks,
    activeProject: state.todoist.activeProject,
  }),
  dispatch => ({
    completeTask: taskId => dispatch(completeTask(taskId)),
    readTasks: () => dispatch(readTasks()),
  })
)(TodoistWidget);
