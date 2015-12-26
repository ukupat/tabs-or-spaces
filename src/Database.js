import Firebase from 'firebase';
import jsonfile from 'jsonfile';

export class FirebaseWrapper {

    constructor(url, token) {
        this.ref = new Firebase(url);
        this.ref.authWithCustomToken(token, function () {});
    }

    readAnd(callback) {
        this.ref.once('value', (snapshot) => callback(snapshot.val()));
    }

    write(data) {
        this.ref.set(data);
    }
}

export class File {

    constructor(file) {
        this.file = file;
    }

    readAnd(callback) {
        jsonfile.readFile(this.file, function(err, obj) {
            callback(obj);
        });
    }

    write(data) {
        jsonfile.writeFile(this.file, data);
    }
}
