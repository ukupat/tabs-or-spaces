//var fs = require('fs');

//var file = fs.readFileSync('foo.json', 'utf8');
//var indent = detectIndent(file).indent || '    ';

var https = require('https');
var detectIndent = require('detect-indent');

function TabsOrSpaces() {

	var languages = ['javascript'];

	function analyseLanguages() {
		var options = {
			host: 'api.github.com',
			path: '/search/repositories?q=+language:javascript&sort=stars&order=desc',
			headers: {'user-agent': 'NodeJS HTTP Client'}
		};

		callback = function(response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				var repos = JSON.parse(str).items;
				console.log(repos);

				for (var i = 0; i < repos.length; i ++) {
					analyseRepo(repos[i].full_name);
				}
			});
		}
		https.request(options, callback).end();
	}

	function analyseRepo(name) {
		var options = {
			host: 'api.github.com',
			path: '/search/code?q=repo:' + name + '+language:javascript',
			headers: {'user-agent': 'NodeJS HTTP Client'}
		};

		callback = function(response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				var files = JSON.parse(str).items;

				for (var i = 0; i < files.length; i ++) {
					analyseFile(files[i].path);
				}
			});
		}
		https.request(options, callback).end();
	}

	function analyseFile(repo, path) {
		var options = {
			host: 'raw.githubusercontent.com',
			path: '/' + repo + '/' + path,
			headers: {'user-agent': 'NodeJS HTTP Client'}
		};
		callback = function(response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(detectIndent(str).type);
			});
		}
		https.request(options, callback).end();
	}

	return {

		go: function () {
			analyseLanguages();
		}
	};
};

TabsOrSpaces().go();

