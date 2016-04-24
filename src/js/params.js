var dataSet = {
    input: [
        {
            title: "Параметр 1",
            id: "p1",
            value: 0.01,
            unit: 'см'
        },
        {
            title: "Параметр 2",
            id: "p2",
            value: 0.02,
            unit: 'кгс'
        },
        {
            title: "Параметр 3",
            id: "p3",
            value: 0.03,
            unit: 'Ом'
        },
        {
            title: "Параметр 4",
            id: "p4",
            value: 0.04,
            unit: ""
        }
    ],
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