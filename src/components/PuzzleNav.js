import React from 'react';

class PuzzleNav extends React.Component {

    handleReset() {
        this.props.onReset();
    }

    render() {
        return (
            <header className="navbar navbar-fixed-top navbar-default">
                <div className="container">

                    <div className="navbar-brand">{this.props.title}</div>
                    <ul className="nav navbar-nav navbar-left">
                        <li><a href="#">Catalog</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <button className="btn navbar-btn" type="button" onClick={this.handleReset.bind(this)}> Reset </button>
                    </ul>

                </div>
            </header>
        )
    }
}

export default PuzzleNav;
