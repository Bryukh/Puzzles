import React from "react";

import "../../../styles/painter.scss";

class Rect extends React.Component {
    render() {
        return (
            <rect {...this.props}
                className={"cell " + (this.props.isPainted ? "painted" : "")}
                onMouseEnter={this.props.mouseIn}
                onMouseOut={this.props.mouseOut}
                onMouseDown={this.props.mouseDown}
                onMouseUp={this.props.mouseUp} />
        )
    }
}

class Puzzle extends React.Component {

    constructor() {
        super();
        this.mouseDown = false;
        this.state = {
            field: {},
            initField: {},
            isWin: false,
            SIZE: 5,
            PAINTED: 2,
            baseSize: 100
        }
    }

    componentWillMount() {
        const N = this.state.SIZE;
        let field = {};
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                field[`${i}-${j}`] = 0;
            }
        }

        for (let i = 0; i < this.state.PAINTED; i++) {
            let row = Math.floor(Math.random() * N);
            let col = Math.floor(Math.random() * N);
            field[`${row}-${col}`] = 1;
        }
        this.setState({initField: field});
        this.clear(field);
    }

    reset() {
        this.clear();
        this.mouseDown = false;
        this.setState({isWin: false});
    }

    clear(initField) {
        initField = initField || this.state.initField;
        let field = this.state.field;
        for (let k of Object.keys(initField)) {
            field[k] = initField[k];
        }
        this.setState({field: field});
    }

    handleCursorIn(coor, e) {
        if (this.mouseDown) {
            let currentField = this.state.field;
            if (currentField[coor]) {
                this.gameOver();
            }
            else {
                currentField[coor] = 1;
                this.setState({field: currentField});
                this.checkWin();
            }
        }
    }

    handleCursorOut(coor, e) {
    }


    handleCursorOutSVG(e) {
        this.gameOver();
    }

    handleMouseDown(coor, e) {
        this.mouseDown = true;
        let currentField = this.state.field;
        currentField[coor] = 1;
        this.setState({field: currentField});
    }

    handleMouseUp(e) {
        this.gameOver();
    }

    checkWin() {
        let result = true;
        let field = this.state.field;
        for (let k of Object.keys(field)) {
            result = result && field[k];
        }
        if (result) {
            console.log("WIN");
            this.setState({isWin: true});
        };
    }

    gameOver() {
        this.mouseDown = false;
        if (this.state.isWin) {
            return;
        }
        this.clear()

    }


    render() {
        let base = this.state.baseSize;
        var rects = Object.keys(this.state.field).map((coor) => {
            let [row, col] = coor.split("-").map((x) => Number(x));
            return <Rect x={col * base}
                y={row * base}
                key={coor}
                isPainted={this.state.field[coor]}
                mouseIn={this.handleCursorIn.bind(this, coor)}
                mouseOut={this.handleCursorOut.bind(this, coor)}
                mouseDown={this.handleMouseDown.bind(this, coor)}
                mouseUp={this.handleMouseUp.bind(this)} />
        });
        let viewBox = base * this.state.SIZE;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <div className="container puzzle-container text-center painter-puzzle" id="puzzle">
                        <svg viewBox={`0 0 ${viewBox} ${viewBox}`}  onMouseLeave={this.handleCursorOutSVG.bind(this)}>
                            {rects}
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}


export default Puzzle;
