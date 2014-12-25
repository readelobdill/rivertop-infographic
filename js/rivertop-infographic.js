$(document).ready(function(){
    var diameter = 850;
    var radius = diameter / 2;
    var innerRadius = radius - 120;

    var cluster = d3.layout.cluster()
            .size([360, innerRadius]);

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
            .interpolate("bundle")
            .tension(.15)
            .radius(function(d) { return d.y; })
            .angle(function(d) { return d.x / 180 * Math.PI; });

    var svg = d3.select("#technology-infomap").append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr("viewBox", -radius + " " + -radius + " 850 1000")
            .attr("preserveAspectRatio", "xMinYMin meet");

        svg.append('defs')
            .append('marker')
            .attr('id', 'section-bookend')
            .attr("markerWidth","2")
            .attr("markerHeight","12")
            // .attr('refx', 5)
            // .attr('refy', 5)
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 50)
            .attr('style', 'stroke:#A6A8AB; stroke-width:3');

    var link = svg.append("g").attr("transform", "rotate(273)").selectAll(".link"),
        node = svg.append("g").attr("transform", "rotate(273)").selectAll(".node"),
        tile = svg.append("g").attr('class', 'tile-continer').attr("transform", "translate(" + -625/2 + "," + (radius + 75) + ")").selectAll(".tile");

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
                .attr("class", function(d) { return "node-group " + d.name; })
                .attr("transform", function(d) { return "rotate(" + (d.x - 97) + ")translate(" + (d.y + 63) + ",0)"; })
                .on("mouseover", activateNode)
                .on("mouseout", deactivateNode);

        node.insert('path')
                .attr("d","M84.276,61.439l8.281-58.25C76.556,1.044,61.212,0,45.75,0C30.64,0,15.641,0.997,0,3.043l8.094,58.253 C33,58.091,58.574,58.031,84.276,61.439z")
                .attr("class", function(d) { return "node-shape " + d.background; })
                .attr("transform", "rotate(97)scale(1)");

        node.insert("foreignObject")
                .attr("transform", function(d){ return d.x >= 180 ? "rotate(278)translate(-82.5, -47.5)" :  "rotate(97)translate(9, 10)"; })
                .attr('height', '45')
                .attr('width', '75')
                .append("xhtml:p")
                .attr("class", "node-text")
                .html(function(d) { return "<span>" + d.text + "</span"; });

        node.each(function(d){
            if(d.functionality){
                var node = d3.select(this);
                var numFunctionalities = _.size(d.functionality);
                _.forEach(d.functionality, function(functionality, index){
                    node.append('circle')
                        .attr("cx", 35 - index * 2.5)
                        .attr("cy", 60 - (numFunctionalities * 10) + index * 20)
                        .attr("r", 5)
                        .attr('class', 'circle-marker ' + functionality);
                });
            }
        });

        var arcSpecs = [
            {startAngle: 23.5, endAngle: 84.5, id: "consumer-markets", text: "CONSUMER MARKETS", textOffset: 135, letterSpacing: 100, dy: "1.5em"},
            {startAngle: 272.5, endAngle: 86, id: "applications", text: "APPLICATIONS", textOffset: 582, letterSpacing: 50, dy: "-0.75em"},
            {startAngle: 274, endAngle: 382, id: "industrial-markets", text: "INDUSTRIAL MARKETS", textOffset: 300, letterSpacing: 100, dy: "1.5em"}
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
                .attr("d", arc)

                // .attr('marker-end', 'url(#section-bookend)')
                // .attr('marker-start', 'url(#section-bookend)');

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


        var functionalityTiles = [
            {
                name: 'chelation',
                text: 'CHELATION',
                index: 0,
                connectedTiles: [
                    'corrosion-inhibitor',
                    'detergent-builder',
                    'set-retarder',
                    'metal-ion-control'
                ]
            },
            {
                name: 'ph-modification',
                text: 'pH MODIFICATION',
                index: 1,
                connectedTiles: [
                    'detergent-builder',
                    'descalant',
                    'acidizer',
                    'acidulant'
                ]
            },
            {
                name: 'dispertion',
                text: 'DISPERTION',
                index: 2,
                connectedTiles: [
                    'anti-redeposition',
                    'agent-structurant',
                    'descalant',
                    'metal-ion-control'
                ]
            },
            {
                name: 'absorption',
                text: 'ABSORPTION',
                index: 3,
                connectedTiles: [
                    'corrosion-inhibitor',
                    'anti-redeposition',
                    'agent-structurant'
                ]
            },
            {
                name: 'barrier',
                text: 'BARRIER',
                index: 4,
                connectedTiles: [
                    'corrosion-inhibitor',
                    'controlled-delivery'
                ]
            },
            {
                name: 'adhesion',
                text: 'ADHESION',
                index: 5,
                connectedTiles: [
                    'agent-structurant'
                ]
            },
            {
                name: 'permeation',
                text: 'PERMEATION',
                index: 6,
                connectedTiles: [
                    'controlled-delivery'
                ]
            },
            {
                name: 'flavor-modification',
                text: 'FLAVOR MODIFICATION',
                index: 7,
                connectedTiles: [
                    'acidulant'
                ]
            },
            {
                name: 'preservation',
                text: 'PRESERVATION',
                index: 8,
                connectedTiles: [
                    'corrosion-inhibitor',
                    'antioxidant',
                    'metal-ion-control'
                ]
            }
        ];

        tile = tile
                .data(functionalityTiles)
                .enter().append("g")
                .attr('class', 'tile-group')
                .attr("transform", function(d){ 
                    if(d.index < 5 ){
                        return  "translate(" + d.index * 125 + ",0)"
                    } else {
                        return  "translate(" + ((d.index - 5) * 125 + 50) + ",35)"
                    }
                })
                .on("mouseover", mouseoverTile)
                .on("mouseout", mouseoutTile);

            tile.insert('rect')
                .attr("width", 120)
                .attr("height", 20)
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("class", function(d) { return d.name; })

                
            tile.insert('text')
                .attr('class', 'tile-text')
                .attr("dy", "1.35em")
                .attr('x', 60)
                .text(function(d){return d.text;});

            svg.select('.tile-continer')
                .append('line')
                .attr('class', 'functionality-line')
                .attr("x1", -30)
                .attr("y1", -15)
                .attr("x2", 655)
                .attr("y2", -15)
                // .attr('marker-end', 'url(#section-bookend)')
                // .attr('marker-start', 'url(#section-bookend)');

            svg.select('.tile-continer').append('text')
                .attr('class', 'functionality-title')
                .attr('dy', '-2.1em')
                .attr('x', 625/2)
                .text('FUNCTIONALITY');

    });

    function mouseoverTile(d){
        var nodeList = [];
        _.forEach(d.connectedTiles, function(connectedTile){
            var node = d3.select('.' + connectedTile);
            nodeList.push(node.data()[0]);
        });
        activateNode(nodeList)

        $('.circle-marker:not(.' + d.name + ')').hide();
    }

    function mouseoutTile(d){
       _.forEach(d.connectedTiles, function(connectedTile){
            var node = d3.select('.' + connectedTile);
            deactivateNode(node.data()[0]);
       }); 

        $('.circle-marker').show();
    }

    function activateNode(d) {
        if(!_.isArray(d)){
            d = [d];
        }
        link
            .classed("link-source", function(l) { if ( _.contains(d, l.source) ) return l.target.target = true; })
            .classed("not-connected", function(l) { if (!_.contains(d, l.source)) return l.target.target = true; });

        node
            .classed("node-source", function(n) { return _.contains(d, n); });
    }

    var deactivateNode = function(d) {
        link
            .classed("link-source", false)
            .classed("not-connected", false);

        node.classed("node-source", false);
    }

    // Lazily construct the package hierarchy from class names.
    var packageHierarchy = function(classes) {
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
    var packageImports = function (nodes) {
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