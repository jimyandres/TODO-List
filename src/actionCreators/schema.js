import { schema } from 'normalizr';

export const todo = new schema.Entity('todos', undefined, { idAttribute: '_id' });
export const arrayOfTodos = [todo];
