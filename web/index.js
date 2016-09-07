(function () {
    var db = {
        'C': {
            'space-2': 97,
            'space-3': 16,
            'space-4': 131,
            'space-8': 8,
            'tab-1': 119
        },
        'C++': {
            'space-2': 96,
            'space-3': 4,
            'space-4': 97,
            'tab-1': 51
        },
        'css': {
            'space-2': 256,
            'space-4': 30,
            'tab-1': 71
        },
        'go': {
            'space-2': 2,
            'space-4': 2,
            'tab-1': 234
        },
        'groovy': {
            'space-2': 19,
            'space-4': 82,
            'tab-1': 9
        },
        'haskell': {
            'space-2': 190,
            'space-4': 113,
            'tab-1': 5
        },
        'java': {
            'space-2': 68,
            'space-4': 191,
            'tab-1': 34
        },
        'javascript': {
            'space-2': 190,
            'space-4': 85,
            'tab-1': 42
        },
        'php': {
            'space-2': 25,
            'space-4': 266,
            'tab-1': 117
        },
        'python': {
            'space-2': 12,
            'space-4': 215,
            'tab-1': 7
        },
        'ruby': {
            'space-2': 489
        },
        'scala': {
            'space-2': 217,
            'space-4': 3
        },
        'shell': {
            'space-2': 139,
            'space-3': 1,
            'space-4': 83,
            'space-8': 2,
            'tab-1': 63
        },
        'swift': {
            'space-2': 10,
            'space-4': 73,
            'tab-1': 5
        },
        'F#': {
            'space-2': 25,
            'space-3': 1,
            'space-4': 148
        },
        'C#': {
            'space-2': 7,
            'space-4': 231,
            'space-8': 1,
            'tab-1': 52
        },
        'erlang': {
            'space-2': 57,
            'space-4': 307,
            'tab-1': 30
        },
        'rust': {
            'space-2': 20,
            'space-3': 2,
            'space-4': 323,
            'tab-1': 10
        },
        'tex': {
            'tab-1': 54,
            'space-2': 269,
            'space-3': 5,
            'space-4': 57,
            'space-8': 1,
        }
    };

    var colors = {
        'tab-1': '#a27eae',
        'space-2': '#19ac70',
        'space-3': '#08784a',
        'space-4': '#6b9f97',
        'space-8': '#96d3ca'
    };

    var labels = {
        'tab-1': 'Tabs',
        'space-2': '2 Spaces',
        'space-3': '3 Spaces',
        'space-4': '4 Spaces',
        'space-8': '8 Spaces'
    };

    var languages = constructLanguagesFrom(db);

    new Vue({
        el: '#charts',
        data: {
            languages: languages.sort()
        }
    });
    initCharts(db, languages);

    function constructLanguagesFrom(db) {
        var languages = [];

        for (var key in db)
            if (db.hasOwnProperty(key))
                languages.push({
                    name: key,
                    analysedReposAmount: _.sum(_.values(db[key]))
                });

        return languages;
    }

    function initCharts(db, languages) {
        for (var id in languages)
            initChart(languages[id].name, db[languages[id].name]);
    }

    function initChart(language, stats) {
        var amount = _.sum(_.values(stats));
        var data = [];

        for (var style in stats)
            if (stats.hasOwnProperty(style))
                data.push({
                    value: calculatePercentage(amount, stats[style]),
                    color: colors[style],
                    label: labels[style]
                });

        var ctx = document.getElementById(language + 'Chart').getContext('2d');

        new Chart(ctx).Pie(data, options());
    }

    function options() {
        var options = {
            tooltipTemplate: '<%= value %>% repos use <%if (label){%><%=label%> <%}%>'
        };

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            options.animation = false;
        return options;
    }

    function calculatePercentage(amount, stat) {
        return Math.round(stat * 100 / amount * 100) / 100;
    }
})();
