// Возвращает входной параметр по его названию
function input(title, onlyValue) {
    for (var i = 0; i < dataSet.input.length; i++) {
        if(dataSet.input[i].title == title) {
            return onlyValue ? dataSet.input[i].value : dataSet.input[i];
        }
    }
}

function getTemplate (id, replaceList) {
    var template = document.getElementById(id).innerHTML;
    if (replaceList == undefined) {
        return template;
    }
    var keys = Object.keys(replaceList);
    keys.forEach(function(key) {
        template = template.replace(new RegExp('{{'+key+'}}','g'), replaceList[key]);
    });
    return template;
}

function $input(id) {
    return document.getElementById(id);
}

function fillTo(v, total) {
    var result = v.toString();
    var actual = result.length;
    for (var i = 0; i < total - actual; i++) {
        result+="&nbsp;";
    }
    return result;
}