import { Component } from "react";
import Aside from "../aside/aside";
import TabsContainer from "../TabsContainer/TabsContainer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favourites: [],
            likes: []
        }
    }

    componentDidUpdate() {
        console.log(this.state.favourites);
    }
    

    addFavourites = (cat, mark) => {
        // console.log(cat);
        if (mark == 'fav') {
            this.setState((data) => {
                const newFavourites = [...data.favourites, cat];
                // console.log(newFavourites);

                return {
                    favourites: newFavourites
                }
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Aside/>
                <div className="wrapper__main">
                    <TabsContainer addFavourites={this.addFavourites}/>
                </div>
            </div>
        )
    }
}

export default App;