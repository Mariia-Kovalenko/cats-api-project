import { useState, useEffect } from "react";
import Aside from "../aside/aside";
import TabsContainer from "../TabsContainer/TabsContainer";

const App = () => {

    const [favourites, setFavourites] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        console.log('favs',favourites);
        console.log('likes',likes);
    }, [favourites, likes])

    const addFavourites = (cat, mark) => {
        // console.log(mark);
        if (mark === 'fav') {
            setFavourites(favourites => [...favourites, cat])
        } else if (mark === 'like') {
            setLikes(likes => [...likes, cat])
        }
    }

    return (
        <div className="wrapper">
            <Aside/>
            <div className="wrapper__main">
                <TabsContainer addFavourites={addFavourites}/>
            </div>
        </div>
    )
}

export default App;