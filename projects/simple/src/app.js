"use strict";
class printer {
    constructor(name) {
        this._name = name;
    }
    print(message) {
        console.log(`${this._name} says: ${message}`);
    }
}
const p = new printer('Cat');
p.print('SimpleStart');
setTimeout(() => {
    p.print('from timeout');
}, 0);
Promise.resolve().then(() => {
    p.print('from promise');
});
p.print('SimpleEnd');
p.print('SimpleEnd');
