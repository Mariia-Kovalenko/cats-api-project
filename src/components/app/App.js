import { useState, useEffect } from "react";
import Aside from "../aside/aside";
import TabsContainer from "../TabsContainer/TabsContainer";
import CatService from "../../services/CatService";
import {BASE_URL} from '../../services/_constants';

const App = () => {

    const catService = new CatService();

    const addFavourites = (imageId) => {
        const user = 'User-007';

        catService.postData(BASE_URL + 'favourites', imageId, user)
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