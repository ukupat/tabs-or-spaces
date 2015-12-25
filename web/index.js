(function () {
    var db = {
      "C" : {
        "2015-12" : {
          "analysedRepos" : 450,
          "stylesCount" : {
            "space-2" : 97,
            "space-3" : 16,
            "space-4" : 131,
            "space-8" : 8,
            "tab-1" : 119
          }
        }
      },
      "C++" : {
        "2015-12" : {
          "analysedRepos" : 270,
          "stylesCount" : {
            "space-2" : 96,
            "space-3" : 4,
            "space-4" : 97,
            "tab-1" : 51
          }
        }
      },
      "css" : {
        "2015-12" : {
          "analysedRepos" : 500,
          "stylesCount" : {
            "space-2" : 256,
            "space-4" : 30,
            "tab-1" : 71
          }
        }
      },
      "go" : {
        "2015-12" : {
          "analysedRepos" : 240,
          "stylesCount" : {
            "space-2" : 2,
            "space-4" : 2,
            "tab-1" : 234
          }
        }
      },
      "groovy" : {
        "2015-12" : {
          "analysedRepos" : 120,
          "stylesCount" : {
            "space-2" : 19,
            "space-4" : 82,
            "tab-1" : 9
          }
        }
      },
      "haskell" : {
        "2015-12" : {
          "analysedRepos" : 330,
          "stylesCount" : {
            "space-2" : 190,
            "space-4" : 113,
            "tab-1" : 5
          }
        }
      },
      "java" : {
        "2015-12" : {
          "analysedRepos" : 330,
          "stylesCount" : {
            "space-2" : 68,
            "space-4" : 191,
            "tab-1" : 34
          }
        }
      },
      "javascript" : {
        "2015-12" : {
          "analysedRepos" : 330,
          "stylesCount" : {
            "space-2" : 190,
            "space-4" : 85,
            "tab-1" : 42
          }
        }
      },
      "php" : {
        "2015-12" : {
          "analysedRepos" : 500,
          "stylesCount" : {
            "space-2" : 25,
            "space-4" : 266,
            "tab-1" : 117
          }
        }
      },
      "python" : {
        "2015-12" : {
          "analysedRepos" : 240,
          "stylesCount" : {
            "space-2" : 12,
            "space-4" : 215,
            "tab-1" : 7
          }
        }
      },
      "ruby" : {
        "2015-12" : {
          "analysedRepos" : 500,
          "stylesCount" : {
            "space-2" : 489
          }
        }
      },
      "scala" : {
        "2015-12" : {
          "analysedRepos" : 240,
          "stylesCount" : {
            "space-2" : 217,
            "space-4" : 3
          }
        }
      },
      "shell" : {
        "2015-12" : {
          "analysedRepos" : 330,
          "stylesCount" : {
            "space-2" : 139,
            "space-3" : 1,
            "space-4" : 83,
            "space-8" : 2,
            "tab-1" : 63
          }
        }
      },
      "swift" : {
        "2015-12" : {
          "analysedRepos" : 90,
          "stylesCount" : {
            "space-2" : 10,
            "space-4" : 73,
            "tab-1" : 5
          }
        }
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
                languages.push({ name: key, analysedReposAmount: _.sum(_.values(db[key]['2015-12'].stylesCount)) });

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

        for (var style in stats)
            if (stats.hasOwnProperty(style))
                data.push({
                    value: calculatePercentage(amount, stats[style]),
                    color: colors[style],
                    label: labels[style]
                });

        var ctx = document.getElementById(language + 'Chart').getContext('2d');

        new Chart(ctx).Pie(data, {
            tooltipTemplate: "<%= value %>% repos use <%if (label){%><%=label%> <%}%>"
        });
    }

    function calculatePercentage(amount, stat) {
        return Math.round(stat * 100 / amount * 100) / 100;
    }
})();
