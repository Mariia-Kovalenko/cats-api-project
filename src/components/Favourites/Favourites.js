import { useState, useEffect } from "react";
import CatService from '../../services/CatService';
import {BASE_URL} from '../../services/_constants';

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
        console.log('favs request');

        onLoading();

        catService.loadData(BASE_URL + 'favourites', {})
            .then(res => {
                const favs = res.map(fav => {
                    const {id, url} = fav.image;

                    return {
                        id,
                        url
                    }
                })

                console.log('favs: ', favs);
                setFavourites(favs);
                
            })
            .catch(onError)
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"></img>
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                            Unfav
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

    const content = favourites.length ? renderItems(favourites) : sorryMessage();

    return (
        <div className="favourites__container">
            {content}
        </div>
    )
}

export default Favourites;