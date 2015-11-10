import React from "react";

import "../../../styles/painter.scss";

class Rect extends React.Component {
    render() {
        return (
            <rect {...this.props} className={"cell " + (this.props.isPainted ? "painted" : "")} />
        )
    }
}

class Puzzle extends React.Component {

    constructor() {
        super();
        this.state = {
            field: [],
            SIZE: 5,
            PAINTED: 2,
            baseSize: 100
        }
    }

    componentWillMount() {
        const N = this.state.SIZE;
        let temp = [];
        for (let i = 0; i < N; i++) {
            let row = [];
            for (let j = 0; j < N; j++) {
                row.push(0);
            }
            temp.push(row);
        }

        for (let i = 0; i < this.state.PAINTED; i++) {
            let row = Math.floor(Math.random() * N);
            let col = Math.floor(Math.random() * N);
            temp[row][col] = 1;
        }
        this.setState({field: temp});
    }

    componentDidMount() {
        setInterval(() => {
            const N = this.state.SIZE;
            let row = Math.floor(Math.random() * N);
            let col = Math.floor(Math.random() * N);
            let tempField = this.state.field;
            tempField[row][col] = 1 - tempField[row][col];
            this.setState({field: tempField})

        }, 1000);
    }

    reset() {
        this.svg.remove();
        this.svg.create();

    }

    render() {
        let base = this.state.baseSize;
        var rects = this.state.field.map((row, rowIndex) => {
            return row.map((el, colIndex) => {
                return <Rect x={colIndex * base} y={rowIndex * base} key={rowIndex + "-" + colIndex} isPainted={el} />
            })
        });
        let viewBox = base * this.state.SIZE;
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <div className="container puzzle-container text-center painter-puzzle" id="puzzle">
                        <svg viewBox={`0 0 ${viewBox} ${viewBox}`}>
                            {rects}
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}


export default Puzzle;
