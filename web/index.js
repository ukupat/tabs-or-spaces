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
        'C#': {
            'space-2': 7,
            'space-4': 231,
            'space-8': 1,
            'tab-1': 52
        },
        'Clojure': {
            'space-2': 425,
            'space-4': 2
        },
        'CoffeeScript': {
            'space-2': 259,
            'space-4': 40,
            'tab-1': 26
        },
        'Common Lisp': {
            'space-2': 300,
            'space-3': 1,
            'space-4': 3,
            'tab-1': 7
        },
        'Crystal': {
            'space-2': 119,
            'space-4': 1,
        },
        'CSS': {
            'space-2': 256,
            'space-4': 30,
            'tab-1': 71
        },
        'D': {
            'space-2': 14,
            'space-4': 130,
            'tab-1': 92
        },
        'Elixir': {
            'space-2': 403,
            'space-4': 6,
            'tab-1': 7
        },
        'Erlang': {
            'space-2': 57,
            'space-4': 307,
            'tab-1': 30
        },
        'F#': {
            'space-2': 25,
            'space-3': 1,
            'space-4': 148
        },
        'Go': {
            'space-2': 2,
            'space-4': 2,
            'tab-1': 234
        },
        'Groovy': {
            'space-2': 19,
            'space-4': 82,
            'tab-1': 9
        },
        'Haskell': {
            'space-2': 190,
            'space-4': 113,
            'tab-1': 5
        },
        'Haxe': {
            'space-2': 19,
            'space-3': 2,
            'space-4': 65,
            'tab-1': 224
        },
        'HTML': {
            'space-2': 90,
            'space-3': 4,
            'space-4': 29,
            'tab-1': 37
        },
        'Java': {
            'space-2': 68,
            'space-4': 191,
            'tab-1': 34
        },
        'JavaScript': {
            'space-2': 190,
            'space-4': 85,
            'tab-1': 42
        },
        'Julia': {
            'space-2': 73,
            'space-3': 2,
            'space-4': 379,
            'tab-1': 34
        },
        'Lua': {
            'space-2': 128,
            'space-3': 58,
            'space-4': 145,
            'tab-1': 149
        },
        'Nim': {
            'space-2': 220,
            'space-3': 2,
            'space-4': 73
        },
        'Objective-C': {
            'space-2': 45,
            'space-4': 340,
            'tab-1': 55
        },
        'OCaml': {
            'space-2': 449,
            'space-3': 1,
            'space-4': 21,
            'tab-1': 6
        },
        'Pascal': {
            'space-2': 435,
            'space-3': 6,
            'space-4': 7,
            'tab-1': 5
        },
        'Perl': {
            'space-2': 44,
            'space-3': 6,
            'space-4': 158,
            'space-8': 2,
            'tab-1': 62
        },
        'PHP': {
            'space-2': 25,
            'space-4': 266,
            'tab-1': 117
        },
        'PowerShell': {
            'tab-1': 69,
            'space-2': 35,
            'space-3': 4,
            'space-4': 325
        },
        'Puppet': {
            'space-2': 285,
            'space-4': 40,
            'tab-1': 20
        },
        'Python': {
            'space-2': 12,
            'space-4': 215,
            'tab-1': 7
        },
        'R': {
            'space-2': 353,
            'space-3': 5,
            'space-4': 75,
            'space-8': 3,
            'tab-1': 29
        },
        'Ruby': {
            'space-2': 489
        },
        'Rust': {
            'space-2': 20,
            'space-3': 2,
            'space-4': 323,
            'tab-1': 10
        },
        'SAS': {
            'tab-1': 24,
            'space-2': 7,
            'space-3': 6,
            'space-4': 6,
        },
        'Scala': {
            'space-2': 217,
            'space-4': 3
        },
        'Shell': {
            'space-2': 139,
            'space-3': 1,
            'space-4': 83,
            'space-8': 2,
            'tab-1': 63
        },
        'SQL': {
            'space-2': 97,
            'space-4': 28,
            'tab-1': 81
        },
        'Swift': {
            'space-2': 10,
            'space-4': 73,
            'tab-1': 5
        },
        'TeX': {
            'tab-1': 54,
            'space-2': 269,
            'space-3': 5,
            'space-4': 57,
            'space-8': 1,
        },
        'TypeScript': {
            'space-2': 107,
            'space-3': 2,
            'space-4': 134,
            'tab-1': 49
        },
        'Vala': {
            'space-2': 56,
            'space-3': 3,
            'space-4': 195,
            'space-8': 6,
            'tab-1': 212
        },
        'Verilog': {
            'space-2': 109,
            'space-3': 41,
            'space-4': 76,
            'space-8': 1,
            'tab-1': 181
        },
        'VimL': {
            'space-2': 315,
            'space-3': 3,
            'space-4': 120,
            'tab-1': 43
        },
        'XML': {
            'space-2': 136,
            'space-3': 3,
            'space-4': 68,
            'tab-1': 56
        },
    };

    var colors = {
        'tab-1': '#a27eae',
        'space-2': '#19ac70',
        'space-3': '#96d3ca',
        'space-4': '#08784a',
        'space-8': '#6b9f97'
    };

    var labels = {
        'tab-1': 'Tabs',
        'space-2': '2 Spaces',
        'space-3': '3 Spaces',
        'space-4': '4 Spaces',
        'space-8': '8 Spaces'
    };

    initChart(db);

    function initChart(db) {
        var datasets = [];

        for (const [label, labelName] of Object.entries(labels)) {
            const data = Object.values(db).map((stats) => stats[label] ?? 0);

            datasets.push({
                data: label === 'tab-1' ? data.map((d) => -d) : data,
                backgroundColor: colors[label],
                label: labelName
            });
        }

        var ctx = document.getElementById('Chart').getContext('2d');
        console.log(datasets)

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(db),
                datasets
            },
            options: options()
        });
    }

    function options() {
        var options = {
            "responsive": true,
            "maintainAspectRatio": false,

            scales: {
                x: {
                    title: {
                        text: '# of Repositories',
                        display: true
                    },
                    stacked: true,
                    min: -300,
                    max: 500,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return Math.abs(value);
                        }
                    }
                },
                y: {
                    stacked: true,
                }
            },
            indexAxis: 'y',
            plugins: {
                legend: {
                    onClick: () => {}
                    // display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context, data) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                const count = Math.abs(context.parsed.x);
                                label += count + ' ' + (count === 1 ? 'repo' : 'repos');
                            }
                            return label;
                        }
                    }
                }

            }
        };

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            options.animation = false;
        return options;
    }

    function calculatePercentage(amount, stat) {
        return Math.round(stat * 100 / amount * 100) / 100;
    }
})();
