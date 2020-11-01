import firebase from "../firebase";

const db = firebase.ref("/category");

class CategoryService {
  getAll() {
    return db;
  }

  create(category) {
    return db.push(category);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new CategoryService();