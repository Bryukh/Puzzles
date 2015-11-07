import React from 'react';

class PuzzleNav extends React.Component {

    handleReset(e) {
        e.preventDefault();
        this.props.onReset();
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <ul className="nav navbar-nav" style={{"float": "none", display: "inline-block"}}>
                        <li><a href="#"><span className="circle-fa"><i className="fa fa-arrow-left"></i></span></a></li>
                        <li className="navbar-brand">
                            <span className="title">{this.props.title}</span>
                        </li>
                        <li><a href="#" onClick={this.handleReset.bind(this)}>
                            <span className="circle-fa"><i className="fa fa-refresh"></i></span>
                        </a></li>
                    </ul>


                </div>
            </nav>

        )
    }
}

export default PuzzleNav;
