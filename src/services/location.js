import firebase from "../firebase";

const db = firebase.database().ref("/location");

class LocationService {
  getAll() {
    return db;
  }

  create(location) {
    return db.push(location);
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

export default new LocationService();