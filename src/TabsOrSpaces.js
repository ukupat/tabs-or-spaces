import https from 'https';
import detectIndent from 'detect-indent';
import _ from 'underscore';
import Promise from 'promise';

export default function TabsOrSpaces(args) {

    var token = args.githubToken;
    var language = args.language;
    var page = args.page || 1;
    var perPage = args.perPage || 20;

    var reposLength;
    var reposStats = {};
    var results = [];

    var success, fail;

    function analyseLanguage() {
        return new Promise(function (resolve, reject) {
            success = resolve;
            fail = reject;

            https.request(
                getOptions('api.github.com', '/search/repositories?q=+language:' + language + '&sort=stars&order=desc' + '&page=' + page + '&per_page=' + perPage),
                constructResponseAnd(analyseRepos)
            ).end();
        });
    }

    function analyseRepos(response) {
        var repos = JSON.parse(response).items;

        if (!repos)
            return fail(new Error('No repos returned from GitHub'));

        reposLength = repos.length;

        for (var i = 0; i < repos.length; i++)
            analyseRepo(repos[i].full_name);
    }

    function analyseRepo(repoName) {
        reposStats[repoName] = { types: [], amounts: [] };

        https.request(
            getOptions('api.github.com', '/search/code?q=repo:' + repoName + '+language:' + language),
            constructResponseAnd(analyseFiles, repoName)
        ).end();
    }

    function analyseFiles(repo, response) {
        var files = JSON.parse(response).items;

        if (!files)
            return --reposLength;

        reposStats[repo].files = files.length;

        for (var i = 0; i < files.length; i ++)
            analyseFile(files[i], repo);
    }

    function analyseFile(file, repo) {
        if (/.min./.test(file.name))
            return --reposStats[repo].files;

        var repoName = file.repository.full_name;
        var options = getOptions('raw.githubusercontent.com', '/' + repoName + '/master/' + encodeURIComponent(file.path));

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
        reposStats[repo].files --;

        if (reposStats[repo].files === 0)
            pushRepoStatistics(repo);

        if (results.length === reposLength)
            return success(results);
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

    return { analyse: analyseLanguage };
}
