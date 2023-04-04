import { useState, useEffect } from "react";
import CatService from '../../services/CatService';
import {BASE_URL, DELETE, FAVOURITES, SORRY_MESSAGE} from '../../utils/_constants';
import Loader from '../../common/Loader/Loader';
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import ActionButton from "../../common/ActionButton/ActionButton";

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFavourites();
    }, [])

    const onLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const getFavourites = () => {
        onLoading();

        CatService.loadData(BASE_URL + FAVOURITES, {})
            .then((res) => {
                const favs = res.map(fav => {
                    const id = fav.id;
                    const url = fav.image.url;

                    return {
                        id,
                        url
                    }
                })
                setFavourites(favs);
                setLoading(false);
            })
            .catch(onError)
    }

    const removeFavourites = (imageId) => {
        CatService.deleteData(BASE_URL + FAVOURITES, imageId)
            .then(() => {
                getFavourites();
            })
            .catch((error) => {
                console.error(error.message);
            })
    }

    function renderItems(arr) {
        const items = arr.map((item) => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat" />
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                            <ActionButton 
                                action={DELETE}
                                onClick={() => removeFavourites(item.id)}
                                text={'Delete'}
                            />
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
                {SORRY_MESSAGE}
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