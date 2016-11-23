import PouchDB from "pouchdb";
import Promise from "bluebird";
import uuid from "uuid";

const db = new PouchDB("todos");

Promise.promisifyAll(db);


export function addTodo(text) {
    const todo = {
        _id: uuid(),
        title: text,
        completed: false
    };
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
