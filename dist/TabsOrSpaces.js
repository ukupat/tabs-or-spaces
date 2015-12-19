'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = TabsOrSpaces;

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _detectIndent = require('detect-indent');

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabsOrSpaces(args) {

    var token = args.githubToken;
    var language = args.language;
    var page = args.page || 1;
    var perPage = args.perPage || 20;

    var reposLength;
    var reposStats = {};
    var results = [];

    var success, fail;

    function analyseLanguage() {
        return new _promise2.default(function (resolve, reject) {
            success = resolve;
            fail = reject;

            _https2.default.request(getOptions('api.github.com', '/search/repositories?q=+language:' + language + '&sort=stars&order=desc' + '&page=' + page + '&per_page=' + perPage), constructResponseAnd(analyseRepos)).end();
        });
    }

    function analyseRepos(response) {
        var repos = JSON.parse(response).items;

        if (!repos) return fail(new Error('No repos returned from GitHub'));

        reposLength = repos.length;

        for (var i = 0; i < repos.length; i++) {
            analyseRepo(repos[i].full_name);
        }
    }

    function analyseRepo(repoName) {
        reposStats[repoName] = { types: [], amounts: [] };

        _https2.default.request(getOptions('api.github.com', '/search/code?q=repo:' + repoName + '+language:' + language), constructResponseAnd(analyseFiles, repoName)).end();
    }

    function analyseFiles(repo, response) {
        var files = JSON.parse(response).items;

        if (!files) {
            reposLength -= 1;
            return;
        }
        reposStats[repo].files = files.length;

        for (var i = 0; i < files.length; i++) {
            analyseFile(files[i], repo);
        }
    }

    function analyseFile(file, repo) {
        if (/\.min\./.test(file.name)) return saveStatistics(repo, { type: null });

        var repoName = file.repository.full_name;
        var options = getOptions('raw.githubusercontent.com', '/' + repoName + '/master/' + encodeURIComponent(file.path));

        _https2.default.request(options, constructResponseAnd(detectFileIndent, repoName)).end();
    }

    function detectFileIndent(repo, response) {
        saveStatistics(repo, (0, _detectIndent2.default)(response));
    }

    function saveStatistics(repo, indent) {
        if (indent.type !== null) {
            reposStats[repo].types.push(indent.type);
            reposStats[repo].amounts.push(indent.amount);
        }
        reposStats[repo].files--;

        if (reposStats[repo].files === 0) pushRepoStatistics(repo);

        if (results.length === reposLength) return success(results);
    }

    function pushRepoStatistics(repo) {
        results.push({
            repo: repo,
            type: _underscore2.default.chain(reposStats[repo].types).countBy().pairs().max(_underscore2.default.last).head().value(),
            amount: _underscore2.default.chain(reposStats[repo].amounts).countBy().pairs().max(_underscore2.default.last).head().value()
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
        };
    }

    return { analyse: analyseLanguage };
}
