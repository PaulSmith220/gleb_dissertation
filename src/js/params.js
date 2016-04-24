var dataSet = {
    input: [
        {
            title: "Число вершин графов",
            id: "graphVerticesAmount",
            value: 0,
            unit: '',
            change: function () {
                var $w_tenzor_cont = $("#w_tenzor_vector .data");
                if ($w_tenzor_cont.length > 0) {
                    console.log('rebuilding w_tenzor_vector');
                    var innerHtml = "<table><tr><th>№</th><th>Значение</th></tr>";
                    for (var i = 0; i < $(this).val(); i++) {
                        innerHtml += [
                            "<tr><td>",
                            i+1,
                            "</td><td>",
                            "<input data-number='" + i + "' type='number' value='" + (dataSet.w_tenzor_vector[i] == undefined ? 0 : dataSet.w_tenzor_vector[i]) + "'/> ",
                            "</td></tr>"
                        ].join('');
                    }
                    $w_tenzor_cont.html(innerHtml);
                }
            }
        },
        {
            title: "Количество систем",
            id: "p2",
            value: 0,
            unit: ''
        },
        {
            title: "Длина дискретного времени",
            id: "p3",
            value: 0,
            unit: ''
        },
        {
            title: "Параметр 4",
            id: "p4",
            value: 0.04,
            unit: ""
        }
    ],
    w_tenzor_vector: [],
    output: [
        {
            title: "Выходной параметр 1",
            formula: function(x) {
                return (2*x + input("Параметр 3", true))/ (Math.pow(x, input("Параметр 1", true)))
            },
            unit: 'л',
            id: 'o1',
            value: 0,
            color: "red"
        },
        {
            title: "Выходной параметр 2",
            formula: function(x) {
                return x * x  * Math.sin(x) * input('Параметр 1', true);
            },
            unit: 'a',
            id: 'o2',
            value: 0,
            color: "green"
        }
    ]
};