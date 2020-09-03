import React from "react";
import Nav from "../components/Nav";
import FeedList from "../components/FeedList";

class Feed extends React.Component {
    state = {
        navValue: "tab-one"
    }

    render() {
        return (
            <div>
                <Nav 
                value={this.state.navValue}
                />
                <FeedList/>
            </div>
            
        );
    }
}

export default Feed;