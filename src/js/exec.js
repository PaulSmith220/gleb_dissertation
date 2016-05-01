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

    



}