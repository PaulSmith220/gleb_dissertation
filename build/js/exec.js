var output = {};

function execute() {
    // Временный 3х-мерный массив, размер определяется длиной дискретного времени
    var tmp_R3_height = parseFloat($("#discretTimeLength").val());
    var tmp_R3 = new Array(tmp_R3_height);
    // В первый слой копируем тензор "Начальное значение тензора импульсного воздействия", остальное заполняем нулями
    var k = parseInt($("#graphVerticesAmount").val()),
        j =  parseInt($("#systemCount").val());

    tmp_R3[0] = [];
    for (var _k = 0; _k < k; _k++) {
        tmp_R3[0][_k] = [];
        for (var _j = 0; _j < j; _j++) {
            tmp_R3[0][_k][_j] = dataSet.w_tenzor_vectorR2[_k][_j];
        }
    }
    for (var layer = 1; layer < tmp_R3_height; layer++) {
        tmp_R3[layer] = [];
        for (var _k = 0; _k < k; _k++) {
            tmp_R3[layer][_k] = [];
            for (var _j = 0; _j < j; _j++) {
                tmp_R3[layer][_k][_j] = 0;
            }
        }
    }
    console.log("Временный 3х-мерный вектор", JSON.stringify(tmp_R3));

    // Временный 2х-мерный массив, размер определяется длиной дискретного времени
    var tmp_R2_height = parseFloat($("#discretTimeLength").val());
    var tmp_R2 = new Array(tmp_R2_height);
    tmp_R2[0] = [];
    for (var i = 0; i < dataSet.w_tenzor_vector.length; i++) {
        tmp_R2[0][i] = dataSet.w_tenzor_vector[i];
    }
    for (var layer = 1; layer < tmp_R2_height; layer++) {
        tmp_R2[layer] = [];
        for (var i = 0; i < dataSet.w_tenzor_vector.length; i++) {
            tmp_R2[layer][i] = 0;
        }
    }
    console.log("Временный 2х-мерный вектор", JSON.stringify(tmp_R2));


    // Перемножаем поэлементно Тензор смежности и Тензор весов вершин и перезаписываем Тензор смежности результатом
    var tmp_R4_AjTenzor = [];
    var i_max = parseFloat($("#graphVerticesAmount").val()),
        j_max = i_max;
    var k_max = parseFloat($("#systemCount").val()),
        m_max = k_max;

    for (j = 0; j < j_max; j++) {
        tmp_R4_AjTenzor[j] =  tmp_R4_AjTenzor[j] || [];

        for (var k = 0; k < k_max; k++) {
            tmp_R4_AjTenzor[j][k] = tmp_R4_AjTenzor[j][k] || [];

            for (var i = 0; i < i_max; i++) {
                tmp_R4_AjTenzor[j][k][i] = tmp_R4_AjTenzor[j][k][i] || [];

                for (var m = 0; m < m_max; m++) {
                    tmp_R4_AjTenzor[j][k][i][m] = dataSet.w_tenzor_vectorR4[j][k][i][m] * dataSet.w_tenzor_vector_w_R4[j][k][i][m];
                }
            }
        }
    }
    console.log("Временный 4х-мерный вектор", JSON.stringify(tmp_R4_AjTenzor));


    // Заполняем оставшиеся слои tmp_R3
    var p = parseInt($("#graphVerticesAmount").val()),
        n =  parseInt($("#systemCount").val());
    console.info("\nРасчёт оставшихся слоев 3х-мерного массива:");
    for(var layer = 1; layer < tmp_R3_height; layer++) {

        var prevLayer = tmp_R3[layer-1],
            currentLayer = tmp_R3[layer];
        console.log("Слой " + (layer+1) + " до расчёта", JSON.stringify(currentLayer));
        for (var k = 0; k < currentLayer.length; k++) {
            for (var j = 0; j < currentLayer[k].length; j++) {
                ////////////////////////////////////////////
                currentLayer[k][j] = 0;
                // По числу скобок в формуле
                for (var i = 0; i < n; i++) {
                    var __br = oneBracket(k, j, p, i, prevLayer, tmp_R4_AjTenzor);
                    currentLayer[k][j] += __br;
                }
                ////////////////////////////////////////////
            }
        }
        console.log("Слой " + (layer+1) + " после расчёта", JSON.stringify(currentLayer));
    }
    console.log("Получившийся 3х-мерный вектор: ", JSON.stringify(tmp_R3) );

    function oneBracket(k, j, p, i, prevLayer, R4) {
        function sumPart(j, k, x) {
            var m1 = prevLayer[x][i],
                m2 = R4[k],
                m2 = m2[j],
                m2 = m2[x],
                m2 = m2[i];
            return m1*m2;
        }

        var result = 0;
        for (var x = 0; x < p; x++) {
            result += sumPart(j, k, x);
        }
        return result;
    }


    // Каждый слой 3х-мерного массива свёртываем по числу систем x число вершин
    p = parseInt($("#graphVerticesAmount").val()),
        n =  parseInt($("#systemCount").val());
    // В каждом слое каждую строку сворачиваем, суммируя элементы. Внутири слоя получится одномепрный массив
    var tmp_R3_clotted = [];
    tmp_R3.forEach(function(layer) {
        var tmp_ = [];
        for (var i = 0; i < p; i++) {
            tmp_.push(
                layer[i].reduce(
                    function(num, sum){
                        return num + sum;
                    },
                    0));
        }
        tmp_R3_clotted.push(tmp_);
    });
    console.log("Его свёртка по числу систем: ", JSON.stringify(tmp_R3_clotted));


    // Заполняем оставшиеся слои tmp_R2
    for (var i = 1; i < tmp_R2.length; i++) {
        for (var x = 0; x < tmp_R2[i].length; x++) {
            tmp_R2[i][x] = 1 - tmp_R2[i-1][x] * tmp_R3_clotted[i][x];
        }
    }
    console.log("Дозаполненный 2х-мерый вектор весов вершин: ", JSON.stringify(tmp_R2));

    output.R2_vertWeight = tmp_R2;
    output.R3_pulceAction = tmp_R3;


}

function saveEvoTenzor() {
    var p = parseInt($("#graphVerticesAmount").val()),
        n =  parseInt($("#systemCount").val());
    var tmp_R3_T = [];
    var _n,_l,_p;
    var html = "";
    var delimiter = $("#dataOutputPrecision").val();
    with(output) {
        // Число слоёв нового массива
        for (var _n = 0; _n < R3_pulceAction[0][0].length; _n++) {
            html += "<h3>Система № " + (_n  + 1) + "</h3>";
            html += "<table border='1' style='border-collapse: collapse;' cellpadding='5'>";
            html += "<tr><td colspan='" + (R3_pulceAction.length + 1)+ "'>Время</td>";
            tmp_R3_T[_n] = [];
            // Число строк в слое
            for (var _p = 0; _p < R3_pulceAction[0].length; _p++) {
                html += "<tr>";
                if (_p == 0) {
                    html += "<td style='width: 13px; text-align: center;' rowspan='" + R3_pulceAction[0].length + "'>В е р ш и н а</td>";
                }
                tmp_R3_T[_n][_p] = [];
                // Число элементов в строке
                for (var _l = 0; _l < R3_pulceAction.length; _l++) {
                    tmp_R3_T[_n][_p][_l] = R3_pulceAction[_l][_p][_n];
                    html += "<td>" + (R3_pulceAction[_l][_p][_n].toFixed(delimiter)) + "</td>";
                }
                html += "</tr>";
            }
            html += "</table><br/><br/>";
        }
    }
    var w = window.open();
    w.document.write(html);

    console.log("Пересортированный 3х-мерный массив: ", JSON.stringify(tmp_R3_T));
}

function saveReliabilityTenzor() {
    var html = "";
    var delimiter = $("#dataOutputPrecision").val();
    with (output) {
        html += "<h3>Тензор надежности вершин</h3>"
        html += "<table border='1' style='border-collapse: collapse;' cellpadding='5'>";
        html += "<tr><td colspan='" + (R2_vertWeight.length + 1)+ "'>Время</td>";
        for (var row = 0; row < R2_vertWeight[0].length; row++) {
            html += "<tr>";
            if (row == 0) {
                html += "<td style='width: 13px; text-align: center;' rowspan='" + R2_vertWeight.length + "'>В е р ш и н а</td>";
            }
            for (var cell = 0; cell < R2_vertWeight.length; cell ++) {
                html += "<td>" + (R2_vertWeight[cell][row].toFixed(delimiter)) + "</td>";
            }
            html += "</tr>";
        }
        html += "</table>";
    }
    var w = window.open();
    w.document.write(html);
}


// :TODO Удалить после окончания тестов
function testData() {
    dataSet.w_tenzor_vector = [1,2,3];
    dataSet.w_tenzor_vectorR2 = [[2,5],[2,5],[2,5]];
    R4_backup_load(true);
    _w_R4_backup_load(true);
}