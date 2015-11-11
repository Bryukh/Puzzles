import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">
                        Created by <a href="http://bryukh.com">Valentin Bryukhanov aka Bryukh</a>.
                        All sources <a href="https://github.com/Bryukh/Puzzles"> here </a>.
                    </p>
                </div>
            </footer>
        );
    }

}

export default Footer;