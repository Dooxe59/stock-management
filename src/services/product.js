import firebase from '../firebase';

const db = firebase.database().ref('/product');

class ProductService {
  getAll() {
    return db;
  }

  create(product) {
    return db.push(product);
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

export default new ProductService();