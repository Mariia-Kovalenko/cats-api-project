import CatService from "../../services/CatService";
import { useState, useEffect } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import {BASE_URL, IMAGES} from '../../services/_constants'

const RandomCat = (props) => {

    const [cat, setCat] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const catService = new CatService();
    let catLoaded = false;

    useEffect(() => {
        loadCat()
    }, [])

    // console.log(cat);

    const onCatLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onCatLoaded = (cat) => {
        // console.log(cat);
        if (!catLoaded) {
            setCat(cat[0]);
            catLoaded = true;
        }
        setLoading(false);
    }

    const loadCat = () => {
        onCatLoading();
        catService.loadData(BASE_URL + IMAGES, {limit: 1, order: 'Desc', page: getRandomPage()})
                .then(onCatLoaded)
                .catch(onError)
    }

    const getRandomPage = () => {
        return Math.floor(Math.random() * 3000);
    }

    const addFavourites = (cat) => {
        props.addFavourites(cat);
        loadCat();
    }

    const loader = loading ? <Loader/> : null;
    
    let buttonsClasses = "random-cat__buttons "
    if (loading || error) {
        buttonsClasses += 'hide'
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? <View cat={cat}/> : null;

    return (
        <div className="random-cat__container">
            {loader}
            {content}
            {errorMessage}
            <div className={buttonsClasses}>
                <button onClick={loadCat} className="cat__button dislike">
                    <img src="images/dislike-white.svg" alt='dislike'></img>
                </button>

                <button onClick={() => addFavourites(cat.id)} className="cat__button like">
                    <img src="images/heart-white.svg" alt='like'></img>
                </button>
            </div>
        </div>
    )
}

const View = ({cat}) => {

    let {id, url} = cat;

    return (
        <div className="random-cat__image">
            <img src={url} alt='cat'/>
        </div>
    )
}

export default RandomCat;