import bent from 'bent';

class Rest {
  static get URL() {
    return 'https://api.todoist.com';
  }
  constructor(token) {
    this.setHeader(token);
  }
  createTask(task) {
    const request = bent(Rest.URL, 'POST', 'json', 200);
    const body = {
      content: '',
      project_id: null,
      section_id: null,
      parent_id: null,
      parent: null,
      order: null,
      label_ids: null,
      priority: null,
      due_string: null,
      due_date: null,
      due_datetime: null,
      due_lang: null,
      assignee: null,
    };
    for (let key in body) {
      const value = task[key];
      if (value !== undefined && value !== null) {
        body[key] = value;
      } else {
        delete body[key];
      }
    }
    return request('/rest/v2/tasks', body, this.header);
  }
  readTasks() {
    const request = bent(Rest.URL, 'GET', 'json', 200);
    return request('/rest/v2/tasks', null, this.header);
  }
  readProjects() {
    const request = bent(Rest.URL, 'GET', 'json', 200);
    return request('/rest/v2/projects', null, this.header);
  }
  completeTask(taskId) {
    const request = bent(Rest.URL, 'POST', null, 204);
    return request(`/rest/v2/tasks/${taskId}/close`, null, this.header);
  }
  deleteTask(taskId) {
    const request = bent(Rest.URL, 'DELETE', null, 203);
    return request('/rest/v2/tasks/' + taskId, null, this.header);
  }
  setHeader(token) {
    this.header = { 'Authorization': 'Bearer ' + token };
  }
}

export { Rest };
