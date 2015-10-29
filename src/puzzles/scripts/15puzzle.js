import Snap from 'snapsvg';
import $ from 'jquery';

import "./../styles/_common.scss";
import "./../styles/15puzzle.scss";


class Puzzle {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId);
        this.cfg = {
            chipSize: 100,
            outPadding: 10,
            inPadding: 5
        };
    }

    prepareSvg() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "puzzle_svg";
        this.container.appendChild(svg);
    }

    create() {
        this.prepareSvg();

        var s = Snap("#puzzle_svg"),
            size = this.cfg.chipSize * 4 + this.cfg.outPadding * 2 + this.cfg.inPadding * 3;
        this.container.style.height = (size + 2 * this.cfg.outPadding) + "px";
        s.attr({width: size + "px", height: size + "px"});
        s.rect(0, 0, size, size).addClass("back");

    }

}

var p = new Puzzle('puzzle');
p.create();


export default Puzzle;
