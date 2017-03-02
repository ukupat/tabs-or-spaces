(function () {
    var db = {
        'AutoHotkey': {
            'space-2': 17,
            'space-3': 2,
            'space-4': 23,
            'tab-1': 68
        },
        'AutoIt': {
            'space-2': 8,
            'space-3': 35,
            'space-4': 20,
            'space-8': 1,
            'tab-1': 253
        },
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
        'Game Maker Language': {
            'space-2': 16,
            'space-4': 8,
            'tab-1': 6
        },
        'Objective-C': {
            'space-2': 45,
            'space-4': 340,
            'tab-1': 55
        },
        'Pascal': {
            'space-2': 435,
            'space-3': 6,
            'space-4': 7,
            'tab-1': 5
        },
        'VimL': {
            'space-2': 315,
            'space-3': 3,
            'space-4': 120,
            'tab-1': 43
        },
        'clojure': {
            'space-2': 425,
            'space-4': 2
        },
        'coffeescript': {
            'space-2': 259,
            'space-4': 40,
            'tab-1': 26
        },
        'common-lisp': {
            'space-2': 300,
            'space-3': 1,
            'space-4': 3,
            'tab-1': 7
        },
        'csharp': {
            'space-2': 7,
            'space-4': 231,
            'space-8': 1,
            'tab-1': 52
        },
        'css': {
            'space-2': 256,
            'space-4': 30,
            'tab-1': 71
        },
        'd': {
            'space-2': 14,
            'space-4': 130,
            'tab-1': 92
        },
        'elixir': {
            'space-2': 403,
            'space-4': 6,
            'tab-1': 7
        },
        'erlang': {
            'space-2': 57,
            'space-4': 307,
            'tab-1': 30
        },
        'fsharp': {
            'space-2': 25,
            'space-3': 1,
            'space-4': 148
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
        'haxe': {
            'space-2': 19,
            'space-3': 2,
            'space-4': 65,
            'tab-1': 224
        },
        'html': {
            'space-2': 90,
            'space-3': 4,
            'space-4': 29,
            'tab-1': 37
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
        'julia': {
            'space-2': 73,
            'space-3': 2,
            'space-4': 379,
            'tab-1': 34
        },
        'lua': {
            'space-2': 128,
            'space-3': 58,
            'space-4': 145,
            'tab-1': 149
        },
        'nimrod': {
            'space-2': 220,
            'space-3': 2,
            'space-4': 73
        },
        'ocaml': {
            'space-2': 449,
            'space-3': 1,
            'space-4': 21,
            'tab-1': 6
        },
        'perl': {
            'space-2': 44,
            'space-3': 6,
            'space-4': 158,
            'space-8': 2,
            'tab-1': 62
        },
        'php': {
            'space-2': 25,
            'space-4': 266,
            'tab-1': 117
        },
        'puppet': {
            'space-2': 285,
            'space-4': 40,
            'tab-1': 20
        },
        'python': {
            'space-2': 12,
            'space-4': 215,
            'tab-1': 7
        },
        'r': {
            'space-2': 353,
            'space-3': 5,
            'space-4': 75,
            'space-8': 3,
            'tab-1': 29
        },
        'ruby': {
            'space-2': 489
        },
        'rust': {
            'space-2': 20,
            'space-3': 2,
            'space-4': 323,
            'tab-1': 10
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
        'sql': {
            'space-2': 97,
            'space-4': 28,
            'tab-1': 81
        },
        'swift': {
            'space-2': 10,
            'space-4': 73,
            'tab-1': 5
        },
        'typescript': {
            'space-2': 107,
            'space-3': 2,
            'space-4': 134,
            'tab-1': 49
        },
        'vala': {
            'space-2': 56,
            'space-3': 3,
            'space-4': 195,
            'space-8': 6,
            'tab-1': 212
        },
        'verilog': {
            'space-2': 109,
            'space-3': 41,
            'space-4': 76,
            'space-8': 1,
            'tab-1': 181
        },
        'xml': {
            'space-2': 136,
            'space-3': 3,
            'space-4': 68,
            'tab-1': 56
        },
        'tex': {
            'tab-1': 54,
            'space-2': 269,
            'space-3': 5,
            'space-4': 57,
            'space-8': 1,
        },
        'Crystal': {
            'space-2': 119,
            'space-4': 1,
        },
        'sas': {
            'tab-1': 24,
            'space-2': 7,
            'space-3': 6,
            'space-4': 6,
        },
        'PowerShell': {
            'tab-1': 69,
            'space-2': 35,
            'space-3': 4,
            'space-4': 325
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
