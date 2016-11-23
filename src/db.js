import PouchDB from "pouchdb";
import uuid from "uuid";
import moment from "moment";

let dir = "todos";
if(process.env.NODE_ENV === "development") {
    PouchDB.debug.enable("*");
} else if(process.env.NODE_ENV === "test") {
    dir = "dbTemp"
}

const db = new PouchDB(dir);

// const getQueueOrder = function() {
//     return db.query({
//         selector: {
//             name: "Mario"
//         },
//     })
// };

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
    return db.put(todo);
}

export function updateTodo(todo) {
    todo.updatedAt = moment().toISOString();
    return db.put(todo);
}


export function removeTodo(doc) {
    return db.remove(doc);
}


export function getTodos(options) {
    return db.allDocs(Object.assign({}, {
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

export default db;
