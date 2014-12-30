(function(){
    var classes = [
        {
            "name":"oil-gas",
            "text": ["OIL & GAS"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "descalant",
                "acidizer",
                "acidulant",
                "metal-ion-control"
            ]
        },
        {
            "name":"industrial-institutional-cleaners",
            "text": ["INDUSTRIAL &", "INSTITUTIONAL", "CLEANERS"],
            "background": "blue",
            "imports":[
                "detergent-builder",
                "anti-redeposition",
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"concrete-additives",
            "text": ["CONCRETE", "ADDITIVES"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "plasticizer",
                "set-retarder",
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"road-safety",
            "text": ["ROAD", "SAFETY"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor"
            ]
        },
        {
            "name":"water",
            "text": ["WATER"],
            "background": "blue",
            "imports":[
                "descalant",
                "metal-ion-control"
            ]
        },
        {
            "name":"agriculture",
            "text": ["AGRICULTURE"],
            "background": "blue",
            "imports":[
                "controlled-delivery",
                "metal-ion-control"
            ]
        },
        {
            "name":"pulp-paper",
            "text": ["PULP &", "PAPER"],
            "background": "blue",
            "imports":[
                "descalant"
            ]
        },
        {
            "name":"personal-care",
            "text": ["PERSONAL", "CARE"],
            "background": "blue",
            "imports":[
                "antioxidant"
            ]
        },
        {
            "name":"pharmaceutical",
            "text": ["PHARMA-", "CEUTICAL"],
            "background": "blue",
            "imports":[
                "controlled-delivery"
            ]
        },
        {
            "name":"food-nutrition",
            "text": ["FOOD &", "NUTRITION"],
            "background": "blue",
            "imports":[
                "antioxidant",
                "acidulant",
                "metal-ion-control"
            ]
        },
        {
            "name":"fabric-homecare",
            "text": ["FABRIC &", "HOMECARE"],
            "background": "blue",
            "imports":[
                "corrosion-inhibitor",
                "detergent-builder",
                "anti-redeposition",
                "agent-structurant",
                "descalant"
            ]
        },


        {
            "name":"metal-ion-control",
            "text": ["CONTROL","METAL ION"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "food-nutrition",
                "agriculture",
                "concrete-additives",
                "water",
                "industrial-institutional-cleaners",
                "oil-gas"
            ],
            "functionality":[
                "preservation",
                "dispertion",
                "chelation"
            ]
        },
        {
            "name":"acidulant",
            "text": ["ACIDULANT"],
            "background": "grey",
            "imports":[
                "food-nutrition",
                "oil-gas"
            ],
            "functionality":[
                "flavor-modification",
                "ph-modification"
            ]
        },
        {
            "name":"acidizer",
            "text": ["ACIDIZER"],
            "background": "grey",
            "imports":[
                "oil-gas"
            ],
            "functionality":[
                "ph-modification",
                "chelation"
            ]
        },
        {
            "name":"descalant",
            "text": ["AGENT", "ANTI-SCALANT","DESCALANT"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "pulp-paper",
                "water",
                "industrial-institutional-cleaners",
                "oil-gas"
            ],
            "functionality":[
                "dispertion",
                "ph-modification",
                "chelation"
            ]
        },
        {
            "name":"agent-structurant",
            "text": ["STRUCTURANT"],
            "background": "grey",
            "imports":[
                "fabric-homecare"
            ],
            "functionality":[
                "absorption",
                "adhesion",
                "dispertion"
            ]
        },
        {
            "name":"anti-redeposition",
            "text": [ "REDEPOSITION", "ANTI-"],
            "background": "grey",
            "imports":[
                "fabric-homecare",
                "industrial-institutional-cleaners"
            ],
            "functionality":[
                "absorption",
                "dispertion"
            ]
        },
        {
            "name":"antioxidant",
            "text": ["ANTIOXIDANT"],
            "background": "grey",
            "imports":[
                "food-nutrition",
                "personal-care"
            ],
            "functionality":[
                "preservation"
            ]
        },
        {
            "name":"controlled-delivery",
            "text": [ "DELIVERY", "CONTROLLED"],
            "background": "grey",
            "imports":[
                "agriculture",
                "pharmaceutical"
            ],
            "functionality":[
                "permeation",
                "barrier"
            ]
        },
        {
            "name":"set-retarder",
            "text": ["RETARDER", "SET"],
            "background": "grey",
            "imports":[
                "concrete-additives"
            ],
            "functionality":[
                "chelation"
            ]
        },
        {
            "name":"plasticizer",
            "text": ["PLASTICIZER"],
            "background": "grey",
            "imports":[
                "concrete-additives"
            ],
            "functionality":[
                "dispertion"
            ]
        },
        {
            "name":"detergent-builder",
            "text": ["BUILDER", "DETERGENT"],
            "background": "grey",
            "imports":[
                "industrial-institutional-cleaners",
                "fabric-homecare"
            ],
            "functionality":[
                "dispertion",
                "ph-modification",
                "chelation"
            ]
        },
        {
            "name":"corrosion-inhibitor",
            "text": ["INHIBITOR", "CORROSION"],
            "background": "grey",
            "imports":[
                "oil-gas",
                "concrete-additives",
                "road-safety",
                "fabric-homecare"
            ],
            "functionality":[
                "barrier",
                "preservation",
                "absorption",
                "chelation"
            ]
        }
    ];

    var markers = [
        {
            name: 'section-bookend',
            markerHeight: '13',
            refY: 0.5
        },
        {
            name: 'section-bookend-flip',
            markerHeight: '13',
            refY: 9.5
        },
        {
            name: 'functionality-bookend',
            markerHeight: '10',
            refY: 0.5
        }
    ];

    var functionalityTiles = [
        {
            name: 'chelation',
            text: 'CHELATION',
            index: 0,
            connectedTiles: [
                'corrosion-inhibitor',
                'detergent-builder',
                'set-retarder',
                'metal-ion-control',
                'acidizer',
                'descalant'
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
                'plasticizer',
                'detergent-builder',
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

    var arcSpecs = [
        {
            id: "consumer-markets",
            text: "CONSUMER MARKETS",
            textOffset: 135,
            letterSpacing: 100,
            dy: "1.5em",
            d: "M153.95010398986426,-358.3285719580703A390,390 0 0,1 388.3639217541181,-35.68563127872696",
            markerName: "section-bookend"
        },
        {
            id: "applications",
            text: "APPLICATIONS",
            textOffset: 587,
            letterSpacing: 50,
            dy: "-0.75em",
            d: "M-389.55087072913074,-18.711470123323966A390,390 0 1,0 389.0499796013315,-27.20502476020882",
            markerName: 'section-bookend-flip'
        },
        {
            id: "industrial-markets", 
            text: "INDUSTRIAL MARKETS", 
            textOffset: 300, 
            letterSpacing: 100,
            dy: "1.5em", 
            d: "M-389.16498006305534,-25.50722039975589A390,390 0 0,1 146.09657143220568,-361.6017032810471",
            markerName: 'section-bookend'
        }
    ];

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

    $(document).ready(function(){

        var mouseoverTile = function (d){
            var nodeList = [];
            _.forEach(d.connectedTiles, function(connectedTile){
                var node = d3.select('.' + connectedTile);
                nodeList.push(node.data()[0]);
            });
            activateNode(nodeList)

            d3.selectAll('.node-source path').classed(d.name, true);
            $('.circle-marker:not(.' + d.name + ')').hide();
        }

        var mouseoutTile = function(d){
            d3.selectAll('.node-source path').classed(d.name, false);

           _.forEach(d.connectedTiles, function(connectedTile){
                var node = d3.select('.' + connectedTile);
                deactivateNode(node.data()[0]);
           }); 

            $('.circle-marker').show();
        }

        var activateNode = function(d) {
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

        var diameter = 850;
        var radius = diameter / 2;
        var innerRadius = radius - 120;

        var cluster = d3.layout.cluster()
                .size([360, innerRadius]);

        var bundle = d3.layout.bundle();

        var line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(.2)
                .radius(function(d) { return d.y; })
                .angle(function(d) { return d.x / 180 * Math.PI; });

        var svg = d3.select("#technology-infomap").append("svg")
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", -radius + " " + -radius + " 850 1000")
                .attr("preserveAspectRatio", "xMinYMin slice");

        var link = svg.append("svg:g").attr("transform", "rotate(273)").selectAll(".link"),
            node = svg.append("svg:g").attr("transform", "rotate(273)").selectAll(".node"),
            nodeText = svg.append("svg:g"),
            tile = svg.append("svg:g").attr('class', 'tile-container').attr("transform", "translate(" + -625/2 + "," + (radius + 75) + ")").selectAll(".tile")
            defs = svg.append("svg:defs");

        _.forEach(markers, function(marker){
            defs.append('svg:marker')
                .attr('id', marker.name)
                .attr("viewBox", "0 0 1 10")
                .attr('markerUnits', 'strokeWidth')
                .attr('markerHeight', marker.markerHeight)
                .attr('refY', marker.refY)
                .attr('orient', 'auto')
                .append('svg:line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', 10)
                .attr('style', 'stroke:#A6A8AB;');
        });

        var nodes = cluster.nodes(packageHierarchy(classes)),
                links = packageImports(nodes);

        link = link
                .data(bundle(links))
                .enter().append("svg:path")
                .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                .attr("class", "link")
                .attr("d", line);

        node = node
                .data(nodes.filter(function(n) {return !n.children; }))
                .enter().append("svg:g")
                .attr("class", function(d) { return "node-group " + d.name; })
                .attr("transform", function(d) { return "rotate(" + (d.x - 97) + ")translate(" + (d.y + 63) + ",0)"; })
                

        node.append('svg:path')
                .attr("d","M84.276,61.439l8.281-58.25C76.556,1.044,61.212,0,45.75,0C30.64,0,15.641,0.997,0,3.043l8.094,58.253 C33,58.091,58.574,58.031,84.276,61.439z")
                .attr("class", function(d) { return "node-shape " + d.background; })
                .attr("transform", "rotate(97)scale(1)")
                .on("mouseover", activateNode)
                .on("mouseout", deactivateNode);

        node.each(function(d, index){
            var node = d3.select(this);
            if(d.functionality){
                var numFunctionalities = _.size(d.functionality);
                _.forEach(d.functionality, function(functionality, index){
                    node.append('circle')
                        .attr("cx", 35 - index * 2.5)
                        .attr("cy", 60 - (numFunctionalities * 10) + index * 20)
                        .attr("r", 5)
                        .attr('class', 'circle-marker ' + functionality);
                });
            }

            var startAngle = d.x >= 180 ? 22 + (15.65 * index) : 8 + (15.65 * index);
            var endAngle = d.x >= 180 ? startAngle - 14: startAngle + 14;

            var numStrings = _.size(d.text)
            var radiusMatrix = [
                [335],
                [345, 330],
                [350, 335, 320]
            ]
            _.forEach(d.text, function(text, i){
                var arc = d3.svg.arc()
                    .innerRadius(radiusMatrix[numStrings - 1][i])
                    .outerRadius(radiusMatrix[numStrings - 1][i])
                    .startAngle( startAngle * (Math.PI/180)) //converting from degs to radians
                    .endAngle( endAngle * (Math.PI/180));

                nodeText.append("path")
                   .attr("transform", "rotate(266)")
                   .attr('id', 'textPath-' + index + i)
                   .attr("d", arc);

                nodeText.append("svg:text")
                        .attr("class", 'node-text')
                        .attr('dy', '4px')
                        .append("textPath")
                        .attr("xlink:href",function(){return "#textPath-"+index+i;})
                        .attr("text-anchor",'middle')
                        .attr("startOffset",'25.5%')
                        .text(text);
            });
        });

        _.forEach(arcSpecs, function(arcSpec){
            svg.append("path")
                .attr('stroke-width', '1')
                .attr('stroke', '#A6A8AB')
                .attr('fill', 'none')
                .attr('id', arcSpec.id)
                .attr("d", arcSpec.d)
                .attr('marker-start', 'url(#' + arcSpec.markerName + ')')
                .attr('marker-end', 'url(#' + arcSpec.markerName + ')');

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
                .attr("dy", "1.2em")
                .attr('x', 60)
                .text(function(d){return d.text;});

            svg.select('.tile-container')
                .append('line')
                .attr('class', 'functionality-line')
                .attr("x1", -30)
                .attr("y1", -15)
                .attr("x2", 655)
                .attr("y2", -15)
                .attr('marker-end', 'url(#functionality-bookend)')
                .attr('marker-start', 'url(#functionality-bookend)');

            svg.select('.tile-container').append('text')
                .attr('class', 'functionality-title')
                .attr('dy', '-2em')
                .attr('x', 625/2)
                .text('FUNCTIONALITY');
    });
})();