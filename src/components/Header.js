import React from "react";

class Header extends React.Component {
    render() {
        return (

            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-xs-offset-1 col-md-10 col-md-offset-2">
                            <h1> Puzzles and Brain Teasers </h1>

                            <p>
                                Just for fun.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;