function plot() {
    var cont = document.getElementById('graph');
    var svg = document.getElementById('visualisation');
    svg.innerHTML = '';

    var data = [];
    var _min = document.getElementById('startX').value*1,
        _max = document.getElementById('endX').value*1,
        _minV = 100000,
        _maxV = -100000;
    for (var i = _min; i <= _max; i+= document.getElementById('stepX').value*1) {
        var elem = {
            x: i
        }
        for (var a = 0; a < dataSet.output.length; a++) {
            var v = dataSet.output[a].formula(i);
            if (v > _maxV) {
                _maxV = v;
            }
            if (v < _minV) {
                _minV = v;
            }
            elem[dataSet.output[a].title] = v;
        }

        data.push(elem);
    }

    var vis = d3.select("#visualisation"),
        WIDTH = 700,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([_min,_max]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([_minV,_maxV]),
        xAxis = d3.svg.axis()
            .scale(xScale),

        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

    vis.append("svg:g")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

    vis.append("svg:g")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

    var lines = [];
    for (var i = 0; i < dataSet.output.length; i++) {
        lines.push(
            {
                data:d3.svg.line()
                    .x(function(d) {
                        return xScale(d.x);
                    })
                    .y(function(d) {
                        return yScale(d[dataSet.output[i].title]);
                    }).interpolate("basis"),
                color: dataSet.output[i].color
            }
        );
    }

    for (var i = 0; i< lines.length; i++) {
        vis.append('svg:path')
            .attr('d', lines[i].data(data))
            .attr('stroke',  lines[i].color)
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    }


}
