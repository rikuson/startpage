import assert from 'assert';
import { Rest } from './TodoistApi';

it('Should return task array', async () => {
  assert.ok(process.env.REACT_APP_TODOIST_API_TOKEN);
  const todoistApi = new Rest(process.env.REACT_APP_TODOIST_API_TOKEN);
  const tasks = await todoistApi.readTasks();
  expect(Array.isArray(tasks)).toBe(true);
});
