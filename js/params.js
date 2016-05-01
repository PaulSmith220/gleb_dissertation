var dataSet = {
    input: [
        {
            title: "Число вершин графов",
            id: "graphVerticesAmount",
            value: 2,
            unit: '',
            change: function () {
                var innerHtml = '';
                var $w_tenzor_cont = $("#w_tenzor_vector .data"),
                    $w_tenzor_contR2 = $("#w_tenzor_vectorR2 .data");
                if ($w_tenzor_cont.length > 0) {
                    console.log('rebuilding w_tenzor_vector');
                    innerHtml = "<table><tr><th>№</th><th>Значение</th></tr>";
                    for (var i = 0; i < $(this).val(); i++) {
                        innerHtml += [
                            "<tr><td>",
                            i+1,
                            "</td><td>",
                            "<input data-number='" + i + "' type='number' onchange='setWtBySelf(this)' value='" + (dataSet.w_tenzor_vector[i] == undefined ? 0 : dataSet.w_tenzor_vector[i]) + "'/> ",
                            "</td></tr>"
                        ].join('');
                    }
                    $w_tenzor_cont.html(innerHtml);
                }
                build_tz_vector_R2();
            }
        },
        {
            title: "Количество систем",
            id: "systemCount",
            value: 4,
            unit: '',
            change: function() {
                build_tz_vector_R2();
            }
        },
        {
            title: "Длина дискретного времени",
            id: "discretTimeLength",
            value: 0,
            unit: ''
        }
    ],
    w_tenzor_vector: [],
    w_tenzor_vectorR2: [],
    w_tenzor_vectorR4: [],
    w_tenzor_vector_w_R4: [],
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

function build_tz_vector_R2() {
    var j = 0;
}