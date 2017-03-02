import File from './src/File';
import Analyser from './src/Analyser';

const language = 'language';
const file = new File(`${language}.json`);
const githubToken = 'GITHUB_TOKEN';

setInterval(() => new Analyser(language, file, githubToken).startAnalysing(), 120000);
