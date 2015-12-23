# Tabs or spaces

Module for analysing which whitespace types are used by top open source repositories in GitHub.

## Installation

Install [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) and use it to install `tabs-or-spaces`

```
$ npm install tabs-or-spaces
```

## Usage

### JavaScript

```javascript
TabsOrSpaces({
    language: 'javascript',
    perPage: 30,
    page: 2
}).analyse().then(console.log).catch(console.log);
```

## License

[MIT](//github.com/ukupat/tabs-or-spaces/blob/master/LICENSE)
