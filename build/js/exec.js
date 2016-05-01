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
            tmp_R3[0][_k][_j] = dataSet.w_tenzor_vectorR2[_j][_k];
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


    



}