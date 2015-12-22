import TabsOrSpaces from './TabsOrSpaces';
import Firebase from 'firebase';

export default class Analyser {

    constructor(language, firebaseUrl, firebaseToken, githubToken) {
        this.unresolved = [];
        this.language = language;
        this.ref = new Firebase(firebaseUrl);
        this.firebaseToken = firebaseToken;
        this.githubToken = githubToken;
    }

    startAnalysing() {
        this.ref.authWithCustomToken(this.firebaseToken, function(error, authData) {});

        console.log('Contacting Firebase');

        this.ref.on('value', (snapshot) => this.beginAnalyseWith(snapshot));
    }

    beginAnalyseWith(snapshot) {
        console.log('Got results from Firebase');
        console.log(snapshot.val());

        this.snapshot = snapshot.val() || {};
        this.analyseRepos = this.analyseHowManyRepos();

        if (!this.analyseRepos)
            return console.log('Over 500 repos analysed, aborting mission');

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
        var unresolved = this.snapshot.unresolvedRepos || [];

        for (var i = 0; i < results.length; i ++) {
            var repo = results[i];
            var type = repo.type + '-' + repo.amount;

            if (repo.type == 'space' && repo.amount == 1 || !repo.type)
                unresolved.push(repo.repo);
            else
                stylesCount[type] = stylesCount[type] ? stylesCount[type] + 1 : 1;
        }
        console.log('Saving info to Firebase');

        this.ref.set({
            stylesCount: stylesCount,
            analysedRepos: analysedRepos,
            unresolvedRepos: unresolved
        });
        process.exit();
    }

    handleShitStorm(error) {
        console.log(error);
        process.exit(1);
    }
}
