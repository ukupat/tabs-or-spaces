var https = require('https');
var detectIndent = require('detect-indent');
var _ = require('underscore');
var program = require('commander');
var fs = require('fs');
var Spinner = require('cli-spinner').Spinner;

program
	.version('0.0.1')
	.option('-l, --language [value]', 'A programming language to analyse')
	.option('-t, --token [value]', 'GitHub token')
	.option('-p, --page [value]', 'Top Repositories page')
	.option('-pp, --perPage [value]', 'Repositories per page')
	.option('-o, --output [value]', 'Location of the output file')
	.parse(process.argv);

function TabsOrSpaces() {

	var spinner = new Spinner('Analysing.. %s');

	var token = program.token;
	var language = program.language;
	var page = program.page || 1;
	var perPage = program.perPage || 20;
	var output = program.output;

	var reposLength;
	var reposStats = {};
	var results = [];

	function analyseLanguage() {
		var options = getOptions('api.github.com', '/search/repositories?q=+language:' + language + '&sort=stars&order=desc' + '&page=' + page + '&per_page=' + perPage);

		https.request(options, constructResponseAnd(analyseRepos)).end();
	}

	function analyseRepos(response) {
		var repos = JSON.parse(response).items;

		if (!repos) {
			console.log('\nWait 1 minute');
			spinner.stop();

			return;
		}
		reposLength = repos.length;

		for (var i = 0; i < repos.length; i++) {
			analyseRepo(repos[i].full_name);
		}
	}

	function analyseRepo(repoName) {
		reposStats[repoName] = {types: [], amounts: []};
		var options = getOptions('api.github.com', '/search/code?q=repo:' + repoName + '+language:' + language);

		https.request(options, constructResponseAnd(analyseFiles, repoName)).end();
	}

	function analyseFiles(repo, response) {
		var files = JSON.parse(response).items;

		if (!files) {
			console.log(response);
			reposLength --;
			return;
		}
		reposStats[repo].files = files.length;

		for (var i = 0; i < files.length; i++) {
			analyseFile(files[i]);
		}
	}

	function analyseFile(file) {
		var repoName = file.repository.full_name;
		var options = getOptions('raw.githubusercontent.com', '/' + repoName + '/master/' + file.path);

		https.request(options, constructResponseAnd(detectFileIndent, repoName)).end();
	}

	function detectFileIndent(repo, response) {
		saveStatistics(repo, detectIndent(response));
	}

	function saveStatistics(repo, indent) {
		if (indent.type !== null) {
			reposStats[repo].types.push(indent.type);
			reposStats[repo].amounts.push(indent.amount);
		}
		reposStats[repo].files -= 1;

		if (reposStats[repo].files === 0) {
			pushRepoStatistics(repo);
		}
		if (results.length === reposLength) {
			writeOutputFile();
		}
	}

	function pushRepoStatistics(repo) {
		results.push({
			repo: repo,
			type: _.chain(reposStats[repo].types).countBy().pairs().max(_.last).head().value(),
			amount: _.chain(reposStats[repo].amounts).countBy().pairs().max(_.last).head().value()
		});
	}

	function getOptions(host, path, page) {
		return {
			host: host,
			path: path,
			page: page || 1,
			headers: {
				'user-agent': 'NodeJS HTTP Client',
				'Authorization': 'token ' + token
			}
		};
	}

	function constructResponseAnd(callback, extraParams) {
		return function (response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				if (extraParams) {
					return callback(extraParams, str);
				}
				callback(str);
			});
		}
	}

	function writeOutputFile() {
		fs.writeFile(output, JSON.stringify(results, null, 2), function () {
			stopLoading();
		});
	}

	function startLoading() {
		spinner.start();
		console.time('Time');
	}

	function stopLoading() {
		spinner.stop();
		console.log('\n');
		console.timeEnd('Time');
	}

	startLoading();
	analyseLanguage();
}

TabsOrSpaces();