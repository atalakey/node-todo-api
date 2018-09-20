const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { User } = require('../models/user');
const { Todo } = require('../models/todo');
const { users, populateUsers, todos, populateTodos } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';
    const token = users[0].tokens[0].token;

    request(app)
      .post('/todos')
      .set('x-auth', token)
      .send({ text })
      .expect(201)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    const token = users[0].tokens[0].token;

    request(app)
      .post('/todos')
      .set('x-auth', token)
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    const token = users[0].tokens[0].token;

    request(app)
      .get('/todos')
      .set('x-auth', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const token = users[0].tokens[0].token;

    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return todo created by other user', (done) => {
    const hexId = todos[1]._id.toHexString();
    const token = users[0].tokens[0].token;

    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();
    const token = users[0].tokens[0].token;

    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object ID is invalid', (done) => {
    const token = users[0].tokens[0].token;

    request(app)
      .get('/todos/123abc')
      .set('x-auth', token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const token = users[0].tokens[0].token;

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not remove a todo created by other user', (done) => {
    const hexId = todos[0]._id.toHexString();
    const token = users[1].tokens[0].token;

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeTruthy();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();
    const token = users[0].tokens[0].token;

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object ID is invalid', (done) => {
    const token = users[0].tokens[0].token;

    request(app)
      .delete('/todos/123abc')
      .set('x-auth', token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    const token = users[0].tokens[0].token;
    const hexId = todos[0]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', token)
      .send({ text, completed: true })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should not update the todo created by other user', (done) => {
    const token = users[1].tokens[0].token;
    const hexId = todos[0]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', token)
      .send({ text, completed: true })
      .expect(404)
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    const token = users[1].tokens[0].token;
    const hexId = todos[1]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', token)
      .send({ text, completed: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    const token = users[0].tokens[0].token;

    request(app)
      .get('/users/me')
      .set('x-auth', token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'example@exapmle.com';
    const password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(201)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return validation errors if request invalid', (done) => {
    const email = 'exampleexapmle.com';
    const password = '123!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    const email = users[0].email;
    const password = '123abc!';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    const id = users[1]._id;
    const email = users[1].email;
    const password = users[1].password;

    request(app)
      .post('/users/login')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(id).then((user) => {
          expect(user.toObject().tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((err) => done(err));
      });
  });

  it('should reject invalid login', (done) => {
    const id = users[1]._id;
    const email = users[1].email;
    const password = users[1].password + '1';

    request(app)
      .post('/users/login')
      .send({ email, password })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(id).then((user) => {
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    const id = users[0]._id;
    const token = users[0].tokens[0].token;

    request(app)
      .delete('/users/me/token')
      .set('x-auth', token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((err) => done(err));
      });
  });
});
