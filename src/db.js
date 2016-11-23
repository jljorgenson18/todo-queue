import PouchDB from "pouchdb";
import Promise from "bluebird";
import uuid from "uuid";
import moment from "moment";

const db = new PouchDB("todos");

Promise.promisifyAll(db);


export function addTodo(title, content) {
    const createdDate = moment().toISOString();
    const todo = {
        _id: uuid(),
        title,
        content,
        comments: [],
        completed: false,
        createdAt: createdDate,
        updatedAt: createdDate
    };
    return db.putAsync(todo);
}

export function updateTodo(todo) {
    todo.updatedAt = moment().toISOString();
    return db.putAsync(todo);
}


export function removeTodo(doc) {
    return db.removeAsync(doc);
}


export function getTodos(options) {
    return db.allDocsAsync(Object.assign({}, {
        include_docs: true,
        descending: true
    }, options));
}

export function addDbChangeListener(cb) {
    db.changes({
        since: "now",
        live: true
    }).on("change", cb);
}
