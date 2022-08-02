import { useState, useEffect } from "react";
import CatService from '../../services/CatService';
import {BASE_URL} from '../../services/_constants';
import Loader from "../loader/loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Favourites = (props) => {

    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const catService = new CatService();
    let favsLoaded = false;

    useEffect(() => {
        getFavourites()
    }, [])

    const onLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const getFavourites = () => {
        // console.log('favs request');

        onLoading();

        catService.loadData(BASE_URL + 'favourites', {})
            .then(res => {
                console.log(res);
                const favs = res.map(fav => {
                    // const {id, url} = fav.image;
                    const id = fav.id;
                    const url = fav.image.url;

                    return {
                        id,
                        url
                    }
                })

                console.log('favs: ', favs);
                setFavourites(favs);
                setLoading(false);
            })
            .catch(onError)
    }

    const removeFavourites = (imageId) => {
        catService.deleteData(BASE_URL + 'favourites', imageId)
            .then(res => {
                console.log(res.data.message);
                getFavourites();
            })
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"></img>
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                            <button className="delete" onClick={() => removeFavourites(item.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="grid-block">
                {items}
            </div>
        )
    }

    function sorryMessage() {
        return (
            <div className="sorry-message">
                Sorry, you have not yet liked any cat
            </div>
        )
    }

    let items;
    if (!favourites.length) {
        items = sorryMessage()
    } else {
        items = renderItems(favourites);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="favourites__container">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default Favourites;