function init() {
    var inputWell = document.getElementById("input_params");
    for(var i = 0; i < dataSet.input.length; i++) {
        inputWell.innerHTML += getTemplate("number_template", dataSet.input[i]);
        var $elem = document.getElementById(dataSet.input[i].id);
        dataSet.input[i].link = $elem;
    }

    setTimeout(function() {
        $("#graphVerticesAmount").change();
    }, 500);

    setTimeout(function() {
        dataSet.input.forEach(function(item) {
            var $elem = $("#" + item.id);
            item.value = $elem.val();
            $elem.on('change', item.change || null);
        })
    }, 0);


    setTimeout(function() {
        document.getElementById("splashscreen").className = "show";
    }, 0);
    setTimeout(function() {
        document.getElementById("splashscreen").className = "show hide";
        setTimeout(function() {
            document.getElementById("splashscreen").remove();
        },400);
    }, 1000);

    window.onerror = function() {
      alert("Произошла ошибка. Проверьте, все ли начальные данные заданы.");
    };
}