import { schema } from 'normalizr';

export const todo = new schema.Entity('todos', undefined, { idAttribute: item => item._id.toString() });
export const arrayOfTodos = [todo];
