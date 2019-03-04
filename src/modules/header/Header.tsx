import * as React from "react";
import ApplicationBar from "./ApplicationBar";
import NavigationBar from "./NavigationBar";

class Header extends React.Component {
    public render() {
        return (
            <header>
                <ApplicationBar />
                <NavigationBar />
            </header>
        );
    }
}

export default Header;