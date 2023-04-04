import { useState, useEffect } from "react";
import Aside from "../../common/Aside/Aside";
import Popup from "../../common/Popup/Popup";
import TabsContainer from "../TabsContainer/TabsContainer";
import CatService from "../../services/CatService";
import {BASE_URL, DEFAULT_USER, FAVOURITES} from '../../utils/_constants';
import axios from "axios";

const App = () => {

    const addFavourites = (imageId) => {
        CatService.postData(BASE_URL + FAVOURITES, imageId, DEFAULT_USER)
            .then(() => {})
            .catch(error => {
                console.error(error.message);
            })
    }

    return (
        <>
        <div className="wrapper">
            <Aside />
            <div className="wrapper__main">
                <TabsContainer addFavourites={addFavourites} />
            </div>
        </div>
        {/* <Popup showPopup={true} message={'Popup'} /> */}
        </> 
    )
}

export default App;