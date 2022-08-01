import { useState, useEffect } from "react";
import Aside from "../aside/aside";
import TabsContainer from "../TabsContainer/TabsContainer";
import CatService from "../../services/CatService";

const App = () => {

    const catService = new CatService();

    const addFavourites = (imageId) => {
        const user = 'User-123';

        catService.postData('https://api.thecatapi.com/v1/favourites', imageId, user)
            .then(res => {
                console.log(res.data.message);
            })
            .catch(err => {
                console.log(err.message);
            })
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