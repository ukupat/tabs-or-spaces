import jsonfile from 'jsonfile';

export default class File {

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
