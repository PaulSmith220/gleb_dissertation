function execute() {


    //Обновляем входа
    for(var i = 0; i < dataSet.input.length; i++) {
        var $elem = document.getElementById(dataSet.input[i].id).value*1;
        dataSet.input[i].value =  $elem;
        console.log(dataSet.input[i].value);
    }


    // Вывод отдельного состояния
    for (var i = 0; i < dataSet.output.length; i++) {
        var v = dataSet.output[i].formula(0);
        dataSet.output[i].value = v;
        document.getElementById(dataSet.output[i].id).innerHTML = v;
    }


}