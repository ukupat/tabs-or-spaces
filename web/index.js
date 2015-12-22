(function () {
    var colors = {
        'tab-1': '#a27eae',
        'space-2': '#19ac70',
        'space-4': '#6b9f97'
    };

    var labels = {
        'tab-1': 'Tabs',
        'space-2': '2 Spaces',
        'space-4': '4 Spaces'
    };

    new Firebase('https://tabs-or-spaces.firebaseio.com').on('value', function (snapshot) {
        var db = snapshot.val();
        var languages = constructLanguagesFrom(db);

        new Vue({
            el: '#charts',
            data: {
                languages: languages.sort()
            }
        });
        initCharts(db, languages);

    }, console.log);

    function constructLanguagesFrom(db) {
        var languages = [];

        for (var key in db)
            if (db.hasOwnProperty(key))
                languages.push({
                    name: key,
                    analysedReposAmount: _.sum(_.values(db[key]['2015-12'].stylesCount))
                });

        return languages;
    }

    function initCharts(db, languages) {
        for (var id in languages)
            initChart(languages[id].name, db[languages[id].name]['2015-12']);
    }

    function initChart(language, data) {
        var stats = data.stylesCount;
        var amount = _.sum(_.values(stats));
        var data = [];

        for (var style in stats) {
            if (!stats.hasOwnProperty(style))
                continue;

            data.push({
                value: calculatePercentage(amount, stats[style]),
                color: colors[style],
                label: labels[style]
            });
        }
        var ctx = document.getElementById(language + 'Chart').getContext('2d');

        new Chart(ctx).Pie(data, {
            tooltipTemplate: "<%= value %>% repos use <%if (label){%><%=label%> <%}%>"
        });
    }

    function calculatePercentage(amount, stat) {
        return Math.round(stat * 100 / amount * 100) / 100;
    }
})();
