import * as React from "react";
import ApplicationBar from "./ApplicationBar";
import NavigationBar from "./NavigationBar";

class Test extends React.Component {
    public render() {
        return (
            <header>
                <ApplicationBar />
                <NavigationBar />
            </header>
        );
    }
}

export default Test;