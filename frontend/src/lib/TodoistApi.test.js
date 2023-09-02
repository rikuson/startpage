import assert from 'assert';
import Rest from './TodoistApi';
import config from '../config.json';

it('Should return task array', async () => {
  assert.ok(config.todoist.apiToken);
  const todoistApi = new Rest(config.todoist.apiToken);
  const tasks = await todoistApi.readTasks();
  expect(Array.isArray(tasks)).toBe(true);
});
