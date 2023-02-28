import { useState, useEffect } from "react";
import Aside from "../../common/Aside/Aside";
import TabsContainer from "../TabsContainer/TabsContainer";
import CatService from "../../services/CatService";
import {BASE_URL, DEFAULT_USER, FAVOURITES} from '../../utils/_constants';

const App = () => {

    const addFavourites = (imageId) => {
        CatService.postData(BASE_URL + FAVOURITES, imageId, DEFAULT_USER)
            .then(() => {})
            .catch(error => {
                console.error(error.message);
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