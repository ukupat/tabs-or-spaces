import TabsOrSpaces from './TabsOrSpaces';

export default class Analyser {

    constructor(language, db, githubToken) {
        this.language = language;
        this.db = db;
        this.githubToken = githubToken;
    }

    startAnalysing() {
        console.log('Contacting Database');

        this.db.readAnd((snapshot) => this.beginAnalyseWith(snapshot));
    }

    beginAnalyseWith(snapshot) {
        console.log('Got results from Firebase');
        console.log(snapshot);

        this.snapshot = snapshot || {};
        this.analyseRepos = this.analyseHowManyRepos();

        if (!this.analyseRepos) {
            console.log('Over 500 repos analysed, aborting mission');
            process.exit();
        }
        console.log('Using TabsOrSpaces');

        TabsOrSpaces(this.options()).analyse().then((results) => this.collectAndSave(results)).catch(this.handleShitStorm);
    }

    analyseHowManyRepos() {
        if (this.snapshot.analysedRepos >= 500)
            return false;

        if (this.snapshot.analysedRepos > 470)
            return 500 - this.snapshot.analysedRepos;

        return 30;
    }

    options() {
        return {
            githubToken: this.githubToken,
            language: this.language,
            perPage: this.analyseRepos,
            page: this.snapshot.analysedRepos ? this.snapshot.analysedRepos / 30 + 1 : 1
        };
    }

    collectAndSave(results) {
        console.log('Got these results from TabsOrSpaces:');
        console.log(results);

        var analysedRepos = this.snapshot.analysedRepos ? this.snapshot.analysedRepos + this.analyseRepos : 30;
        var stylesCount = this.snapshot.stylesCount || {};
        var topReposOfStyles = this.snapshot.topReposOfStyles || {}

        for (var i = 0; i < results.length; i ++) {
            var repo = results[i];
            var type = repo.type + '-' + repo.amount;

            if (!topReposOfStyles[type])
                topReposOfStyles[type] = [repo.repo];
            else if (topReposOfStyles[type].length < 3)
                topReposOfStyles[type].push(repo.repo);

            if (repo.type && repo.amount)
                stylesCount[type] = stylesCount[type] ? stylesCount[type] + 1 : 1;
        }
        console.log('Saving info to Database');

        this.db.write({
            stylesCount: stylesCount,
            analysedRepos: analysedRepos,
            topReposOfStyles: topReposOfStyles
        });
    }

    handleShitStorm(error) {
        console.log(error);
        process.exit(1);
    }
}
