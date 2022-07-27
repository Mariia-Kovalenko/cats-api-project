import {useState, useEffect} from 'react';
import CatService from '../../services/CatService';
import Select from "react-select";
import { colourStyles } from '../../services/_select-styles';
import {BASE_URL, BREEDS, IMAGES} from '../../services/_constants'
import Loader from '../loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Gallery = (props) => {

    let breedsOptions = [
        {value: 'any', label: 'Any'}
    ];

    let categoriesOptions = [
        {value: 'any', label: 'Any'}
    ];
    const [selectedBreedOption, setSelectedBreedOption] = useState(breedsOptions[0]);
    const [breedOptions, setBreedsOptions] = useState(breedsOptions);
    const [categoryOptions, setCategoryOptions] = useState(categoriesOptions);
    const [selectedCategory, setSelectedCategory] = useState(categoriesOptions[0])
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(8);

    const catService = new CatService();
    let catsLoaded = false;
    // console.log('cats', cats);

    useEffect(() => {
        onRequest();
        // loadCatImages();
    }, [])

    const onLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const addFavourites = (cat, mark) => {
        props.addFavourites(cat, mark);
    }


    const onRequest = () => {
        console.log('request');
        onLoading();

        catService.loadData(BASE_URL + BREEDS, {limit: 67})
            .then((res) => {
                const breeds  = res.map(breed => {
                    const {id, name} = breed;
                    return {
                        value: name,
                        label: name,
                        id: id
                    }
                });

                // console.log(breeds);;

                catService.loadData(BASE_URL + 'categories')
                    .then(res => {
                        const categories = res.map(category => {
                            const {id, name} = category;
                            return {
                                value: name,
                                label: name,
                                id: id
                            }
                        });

                        // console.log(cats.length);
                        if (!catsLoaded) {
                            catsLoaded = true;
                            loadCatImages();
                        }
                        setBreedsOptions(breedOptions => [...breedOptions, ...breeds]);
                        setCategoryOptions(categoryOptions => [...categoryOptions, ...categories]);
                    })
                    .catch(onError)
            }).catch(onError)
    }

    const onCatsLoaded = (res) => {
        const newCats = res.map(cat => {
            const {id, url} = cat;

            return {
                id: id,
                url: url
            }
        })
        console.log(cats);

        setCats([...newCats]);
        setLoading(false);
    }

    const loadCatImages = () => {
            onLoading();

            const category = selectedCategory.id === 'any' ? '' : selectedCategory.id;
            const breed = selectedBreedOption.id === 'any' ? '' : selectedBreedOption.id;
            // if (selectedBreedOption.value)
            catService.loadData(BASE_URL + IMAGES, {
                limit: limit,
                category_ids: category,
                breed_ids: breed
            })
            .then(onCatsLoaded)
            .catch(onError)
    }

    // const pagination = () => {
    //     setLimit(limit => limit + 4);
    //     loadCatImages();
    // }

    function renderItems(arr) {
        if (!arr.length) {
            return (
                <div className='not-fount-message'>
                    No images matching this filter. Try another filter.
                </div>
            )
        }

        const items = arr.map(item => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"></img>
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                        <button onClick={() => addFavourites(item, 'like')}>
                            <img src='images/heart-pink.svg'></img>
                        </button>
                        <button onClick={() => addFavourites(item, 'fav')}>
                            <img src='images/star-pink.svg'></img>
                        </button>
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

    const items = renderItems(cats);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className='gallery'>
            <div className='component__filter'>
            <div className="filter">
                    <div id="breeds-filter" className="filter__select">
                        <label className="label">Breed</label>
                        <Select 
                            defaultValue={selectedBreedOption}
                            onChange={setSelectedBreedOption}
                            options={breedOptions}
                            styles={colourStyles}/>
                    </div>
                    <div id="category-filter" className="filter__select">
                        <label className="label">Category</label>
                        <Select 
                            defaultValue={selectedCategory}
                            onChange={setSelectedCategory}
                            options={categoryOptions}
                            styles={colourStyles}/>
                    </div>
                    <button onClick={loadCatImages} className="reload-btn"><img src="images/search.svg"/></button>
                    <button onClick={loadCatImages} className="reload-btn"><img src="images/reload.svg"/></button>
                </div>
            </div>
            <div className="breeds__images">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    )
}

export default Gallery