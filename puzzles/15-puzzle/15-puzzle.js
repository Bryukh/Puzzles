import Snap from 'snapsvg';
import $ from 'jquery';

class Puzzle {
    constructor(containerId, options) {
        this.container = $("#" + containerId);
        this.options = options || {};
    }

    create() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.container.append($(svg).attr("id", "puzzle_svg"));
        var s = Snap("#puzzle_svg");
        s.attr({width: "300px", height: "200px"});
        var bigCircle = s.circle(150, 150, 100);
        bigCircle.attr({
            fill: "#bada55",
            stroke: "#000",
            strokeWidth: 5
        });
    }

}

var p = new Puzzle('puzzle');
p.create();


export default Puzzle;
