var https = require('https');
var detectIndent = require('detect-indent');
var _ = require('underscore');
var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .option('-l, --language [value]', 'A programming language to analyse')
  .option('-t, --token [value]', 'GitHub token')
  .option('-o, --output [value]', 'Location of the output file')
  .parse(process.argv);

function TabsOrSpaces() {

	var token = program.token;
	var language = program.language;
	var output = program.output;

	var reposLength;
	var reposStats = {};
	var results = [];

	function analyseLanguages() {
		https.request(getOptions('api.github.com', '/search/repositories?q=+language:' + language + '&sort=stars&order=desc'), constructResponseAnd(analyseRepos)).end();
	}

	function analyseRepos(response) {
		var repos = JSON.parse(response).items;

		if (!repos) {
			console.log('Wait 1 minute');
			return;
		}
		reposLength = repos.length;

		for (var i = 0; i < repos.length; i ++) {
			analyseRepo(repos[i].full_name);
		}
	}

	function analyseRepo(name) {
		reposStats[name] = {
			types: [],
			amounts: []
		};
		var callback = function (response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				analyseFiles(name, str);
			});
		};
		https.request(getOptions('api.github.com', '/search/code?q=repo:' + name + '+language:' + language), callback).end();
	}

	function analyseFiles(repo, response) {
		var files = JSON.parse(response).items;

		if (!files) {
			reposLength --;
			console.log(response);
			return;
		}
		reposStats[repo].files = files.length;

		for (var i = 0; i < files.length; i ++) {
			analyseFile(files[i]);
		}
	}

	function analyseFile(file) {
		var callback = function (response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				detectFileIndent(file.repository.full_name, str);
			});
		};
		https.request(getOptions('raw.githubusercontent.com', '/' + file.repository.full_name + '/master/' + file.path), callback).end();
	}

	function detectFileIndent(repo, response) {
		var indent = detectIndent(response);

		if (indent.type !== null) {
			reposStats[repo].types.push(indent.type);
			reposStats[repo].amounts.push(indent.amount);
		}
		reposStats[repo].files -= 1;

		if (reposStats[repo].files === 0) {
			results.push({
				repo: repo,
				type: _.chain(reposStats[repo].types).countBy().pairs().max(_.last).head().value(),
				amount: _.chain(reposStats[repo].amounts).countBy().pairs().max(_.last).head().value()
			});
		}
		if (results.length === reposLength) {
			fs.writeFile(output, JSON.stringify(results, null, 2), function(err) {
		    	console.timeEnd('Time');
			}); 
		}
	}

	function getOptions(host, path) {
		return {
			host: host,
			path: path,
			headers: {
				'user-agent': 'NodeJS HTTP Client',
				'Authorization': 'token ' + token
			}
		};
	}

	function constructResponseAnd(callback) {
		return function (response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				callback(str);
			});
		}
	}

	return {

		go: function () {
			console.time('Time');
			analyseLanguages();
		}
	};
};

TabsOrSpaces().go();