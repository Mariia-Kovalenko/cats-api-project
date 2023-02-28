import CatService from "../../services/CatService";
import { useState, useEffect } from 'react';
import Loader from '../../common/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import {BASE_URL, DESC, DISLIKE, IMAGES, LIKE} from '../../utils/_constants'
import ActionButton from "../../common/ActionButton/ActionButton";

const RandomCat = (props) => {

    const [cat, setCat] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let catLoaded = false;

    useEffect(() => {
        loadCat()
    }, [])

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
        CatService.loadData(
            BASE_URL + IMAGES, 
            {
                limit: 1, 
                order: DESC, 
                page: getRandomPage()
            }).then(onCatLoaded)
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
    const content = !(loading || error) ? <Cat cat={cat}/> : null;

    return (
        <div className="random-cat__container">
            {loader}
            {content}
            {errorMessage}
            <div className={buttonsClasses}>
                <ActionButton 
                    action={DISLIKE}
                    onClick={loadCat}
                    imageSrc={'images/dislike-white.svg'}
                />
                <ActionButton 
                    action={LIKE}
                    onClick={() => addFavourites(cat.id)}
                    imageSrc={'images/heart-white.svg'}
                />
            </div>
        </div>
    )
}

const Cat = ({cat}) => {
    let { url } = cat;

    return (
        <div className="random-cat__image">
            <img src={url} alt='cat'/>
        </div>
    )
}

export default RandomCat;