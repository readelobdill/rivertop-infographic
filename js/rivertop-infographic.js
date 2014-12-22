$(document).ready(function(){

    $(window).on('resize', function(){
        $container.empty();
        draw();
    });


    var $container = $('#technology-infomap'),
        diameter,
        radius,
        innerRadius,
        cluster,
        bundle,
        line,
        svg,
        link,
        node;

    draw();

    function draw(){
        // var sizeModifier = $container.width()/8;
        diameter = 850;
        radius = diameter / 2;
        innerRadius = radius - 120;

        cluster = d3.layout.cluster()
                .size([360, innerRadius]);

        bundle = d3.layout.bundle();

        line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(.4)
                .radius(function(d) { return d.y; })
                .angle(function(d) { return d.x / 180 * Math.PI; });

        svg = d3.select("#technology-infomap").append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .append("g")
                .attr("transform", "translate(" + radius + "," + radius + ")rotate(273)");

        link = svg.append("g").selectAll(".link");
            node = svg.append("g").selectAll(".node");

        d3.json("data/rivertop-infographic.json", function(error, classes) {
            var nodes = cluster.nodes(packageHierarchy(classes)),
                    links = packageImports(nodes);

            link = link
                    .data(bundle(links))
                    .enter().append("path")
                    .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                    .attr("class", "link")
                    .attr("d", line);

            node = node
                    .data(nodes.filter(function(n) {return !n.children; }))
                    .enter().append("g")
                    .attr("class", "node-group")
                    .attr("transform", function(d) { return "rotate(" + (d.x - 97) + ")translate(" + (d.y + 63) + ",0)"; })
                    .on("mouseover", mouseovered)
                    .on("mouseout", mouseouted);

            node.insert('path')
                    .attr("d","M84.276,61.439l8.281-58.25C76.556,1.044,61.212,0,45.75,0C30.64,0,15.641,0.997,0,3.043l8.094,58.253 C33,58.091,58.574,58.031,84.276,61.439z")
                    .attr("class", function(d) { return "node-shape " + d.background; })
                    .attr("transform", "rotate(97)scale(1)");

            node.insert("foreignObject")
                    .attr("transform", function(d){ return d.x >= 180 ? "rotate(276)translate(-80, -50)" :  "rotate(97)translate(10, 8)"; })
                    .attr('height', '45')
                    .attr('width', '70')
                    .append("xhtml:p")
                    .attr("class", "node-text")
                    .html(function(d) { return "<span>" + d.text + "</span"; });

            node.each(function(d){
                if(d.functionality){
                    var node = d3.select(this);
                    _.forEach(d.functionality, function(functionality, index){
                        node.append('circle')
                            .attr("cx", 37 - index * 2.5)
                            .attr('fill', 'purple')
                            .attr("cy", 20 + index * 20)
                            .attr("r", 5)
                            .attr('class', functionality);
                    });
                }
            });

            var arcSpecs = [
                {startAngle: 1, endAngle: 108.5, id: "industrial-markets", text: "INDUSTRIAL MARKETS", textOffset: 300, letterSpacing: 100, dy: "1.5em"},
                {startAngle: 110, endAngle: 171.5, id: "consumer-markets", text: "CONSUMER MARKETS", textOffset: 200, letterSpacing: 100, dy: "1.5em"},
                {startAngle: 359.5, endAngle: 173, id: "applications", text: "APPLICATIONS", textOffset: 590, letterSpacing: 50, dy: "-0.75em"}
            ];

            _.forEach(arcSpecs, function(arcSpec){
                var arc = d3.svg.arc()
                    .innerRadius(radius - 35)
                    .outerRadius(radius - 36)
                    .startAngle(arcSpec.startAngle * (Math.PI/180)) //converting from degs to radians
                    .endAngle(arcSpec.endAngle * (Math.PI/180));

                svg.append("path")
                    .attr('fill', '#A6A8AB')
                    .attr('id', arcSpec.id)
                    .attr("d", arc);

                svg.append("text")
                  .attr('class', 'section-text')
                  .style("letter-spacing", arcSpec.letterSpacing)
                  .attr("dy", arcSpec.dy)
                  .append("textPath")
                  .attr("textLength",50)
                  .attr("xlink:href",function(){return "#"+arcSpec.id;})
                  .attr("startOffset", arcSpec.textOffset)
                  .text(arcSpec.text);
            });

        });
    }

    function mouseovered(d) {
        node
                .each(function(n) { n.target = n.source = false; });

        link
                .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
                .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
                .classed("not-connected", function(l) { if (l.source !== d) return l.target.target = true; });

        node
                .classed("node--target", function(n) { return n.target; })
                .classed("node--source", function(n) { return n.source; });
    }

    function mouseouted(d) {
        link
                .classed("link--target", false)
                .classed("link--source", false)
                .classed("not-connected", false);

        node
                .classed("node--target", false)
                .classed("node--source", false);
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name], i;
            if (!node) {
                node = map[name] = data || {name: name, children: []};
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function(d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
                imports = [];

        // Compute a map from name to node.
        nodes.forEach(function(d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function(d) {
            if (d.imports) d.imports.forEach(function(i) {
                imports.push({source: map[d.name], target: map[i]});
            });
        });

        return imports;
    }
});