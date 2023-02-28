import Select from "react-select";
import { useEffect, useState } from "react";
import CatService from "../../services/CatService";
import {ADD_FAVOURITES, ANY_CATEGORY, BASE_URL, BREEDS, DATA_LIMIT, IMAGES, INFO, LIMIT_OPTIONS} from '../../utils/_constants'
import Loader from '../../common/Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { colourStyles } from '../../utils/_select-styles';
import ActionButton from "../../common/ActionButton/ActionButton";
import Filter from "../Filter/Filter";

const Breeds = (props) => {
    let breedsOptions = [
        {value: ANY_CATEGORY, label: 'Any'}
    ];
    

    const [selectedBreedOption, setSelectedBreedOption] = useState(breedsOptions[0]);
    const [breedOptions, setBreedsOptions] = useState(breedsOptions);
    const [selectedFilterOption, setSelectedFilterOption] = useState(LIMIT_OPTIONS[0]);
    const [catBreeds, setCatBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let randomBreed = null;

    useEffect(() => {
        initialRequest()
    }, [])

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onBreedsLoading = () => {
        setLoading(true);
    }
    const addFavourites = (imageId) => {
        props.addFavourites(imageId);
    }

    // const onRequest = (limit = 67) => {
    //     console.log('request to local server');
    //     axios.post('http://localhost:8080/api/auth/register', {
    //         username: "React",
    //         password: "react"
    //     })
    //     .then(res => {
    //         console.log('connected to server');
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    // const loadDefaultBreeds = () => {
    //     // onBreedsLoading();

    //     const randomId = Math.floor(Math.random() * (breedOptions.length - 1))
    //     const randomBreed = breedOptions[randomId];
    //     console.log(randomBreed);

    //     CatService.loadData(BASE_URL + IMAGES + '?breed_ids=' + randomBreed.id, {limit: selectedFilterOption.value})
    //         .then(onBreedFound)
    //         .catch(onError)
    // }

    const initialRequest = (limit = DATA_LIMIT) => {
        onBreedsLoading();
        CatService.loadData(BASE_URL + BREEDS, {limit: limit})
            .then((res) => {
                // load list of breeds
                const breeds  = res.map(breed => {
                    const {id, name} = breed;
                    return {
                        value: name,
                        label: name,
                        id: id
                    }
                });

                if (!randomBreed) {
                    const randomId = Math.floor(Math.random() * (breeds.length - 1))
                    randomBreed = breeds[randomId];

                    CatService.loadData(BASE_URL + IMAGES + '?breed_ids=' + randomBreed.id, {limit: selectedFilterOption.value})
                    .then((res) => {
                        setBreedsOptions([...breeds]);
                        onBreedFound(res);
                    })
                    .catch(onError)
                }

            })
            .catch(onError)
    }

    const loadCatBreeds = () => {
            onBreedsLoading();
            let breed = ''
            if (selectedBreedOption.value !== 'any') {
                breed = selectedBreedOption.id
            } else {
                const randomId = Math.floor(Math.random() * (breedOptions.length - 1))
                breed = breedOptions[randomId].id;
            }

            CatService.loadData(BASE_URL + IMAGES + '?breed_ids=' + breed, {limit: selectedFilterOption.value})
                .then(onBreedFound)
                .catch(onError)
    }

    const onBreedFound = (res) => {
        const cats = res.map((cat) => {
            const {id, url} = cat;
            const breed = cat.breeds[0];
            const {name, description, origin, temperament, weight: {metric}, life_span} = breed
            return {
                id: id,
                breedId: breed.id,
                url: url,
                breed: {
                    name, 
                    description,
                    origin,
                    temperament,
                    metric,
                    life_span
                }
            }
        })

        setCatBreeds([...cats])
        setLoading(false);
    }

    // const onBreedsListLoaded = (res) => {
    //     const breeds  = res.map(breed => {
    //         const {id, name} = breed;
    //         return {
    //             value: name,
    //             label: name,
    //             id: id
    //         }
    //     })

    //     setBreedsOptions(breedOptions => [...breeds]);
    //     // console.log(catBreeds);
    //     if (catBreeds.length) setLoading(false);
    // }

    const showInfo = (item) => {
        const cat = catBreeds.find(cat => cat.id === item.id)
        props.showData(cat);
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"/>
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                            <ActionButton 
                                action={ADD_FAVOURITES} 
                                onClick={() => addFavourites(item.id)} 
                                imageSrc={'images/heart-pink.svg'} 
                            />
                            <ActionButton 
                                action={INFO}
                                onClick={() => showInfo(item)}
                                text={'i'} 
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

    const items = renderItems(catBreeds);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Loader/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="breeds">
            <div className="component__filter">
                <Filter
                    breedsFilter={{
                        show: true,
                        defaultValue: selectedBreedOption,
                        onChange: setSelectedBreedOption,
                        options: breedOptions
                    }}
                    limitFilter={{
                        show: true,
                        defaultValue: selectedFilterOption,
                        onChange: setSelectedFilterOption,
                    }}
                    onSearch={loadCatBreeds}
                    onReload={loadCatBreeds}
                />
            </div>
            
            <div className="breeds__images">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    );
};


export default Breeds;
