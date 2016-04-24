function execute() {
    var showValue = document.getElementById("showX").value*1,
        startX = document.getElementById("startX").value*1,
        endX = document.getElementById("endX").value*1,
        stepX = document.getElementById("stepX").value*1;

    //Обновляем входа
    for(var i = 0; i < dataSet.input.length; i++) {
        dataSet.input[i].value =  document.getElementById(dataSet.input[i].id).value*1;
        console.log(dataSet.input[i].value);
    }


    // Основной цикл
    for (var x = startX; x <= endX; x+= stepX) {

        for (var i = 0; i < dataSet.output.length; i++) {

        }
    }

    // Вывод отдельного состояния
    for (var i = 0; i < dataSet.output.length; i++) {
        var v = dataSet.output[i].formula(showValue);
        dataSet.output[i].value = v;
        document.getElementById(dataSet.output[i].id).innerHTML = v;
    }


    try {

        plot();

    } catch (err) {
        alert("Ошибка вычисления, проверьте, не осуществляется ли деление на ноль");
    }
}