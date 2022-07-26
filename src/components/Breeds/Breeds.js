import Select from "react-select";
import { useEffect, useState } from "react";
import CatService from "../../services/CatService";
import {BASE_URL, BREEDS, IMAGES} from '../../services/_constants'
import Loader from '../loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Breeds = () => {
    let breedsOptions = [
        {value: 'any', label: 'Any'}
    ];
    const limitOptions = [
        {value: 3, label: '3 items per page'},
        {value: 6, label: '6 items per page'},
        {value: 9, label: '9 items per page'},
    ]

    const [selectedBreedOption, setSelectedBreedOption] = useState(breedsOptions[0]);
    const [breedOptions, setBreedsOptions] = useState(breedsOptions);
    const [selectedFilterOption, setSelectedFilterOption] = useState(limitOptions[0]);
    const [catBreeds, setCatBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const catService = new CatService();
    let randomBreed = null;

    useEffect(() => {
        initialRequest()
    }, [])

    // console.log(breedOptions);
    console.log(catBreeds);

    const onBreedsLoading = () => {
        setLoading(true);
    }

    const onRequest = (limit = 67) => {
        console.log('request');
        onBreedsLoading();
        catService.loadData(BASE_URL + BREEDS, {limit: limit})
            .then(onBreedsListLoaded)
            .catch(onError)
    }

    const loadDefaultBreeds = () => {
        // onBreedsLoading();

        const randomId = Math.floor(Math.random() * (breedOptions.length - 1))
        const randomBreed = breedOptions[randomId];
        console.log(randomBreed);

        catService.loadData(BASE_URL + IMAGES + '?breed_ids=' + randomBreed.id, {limit: selectedFilterOption.value})
            .then(onBreedFound)
            .catch(onError)
    }

    const initialRequest = (limit = 67) => {
        console.log('request');
        onBreedsLoading();
        catService.loadData(BASE_URL + BREEDS, {limit: limit})
            .then((res) => {
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
                    console.log(randomBreed);

                    catService.loadData(BASE_URL + IMAGES + '?breed_ids=' + randomBreed.id, {limit: selectedFilterOption.value})
                    .then((res) => {
                        setBreedsOptions([...breeds]);
                        onBreedFound(res);
                    })
                    .catch(onError)
                }

            })
            .catch(onError)
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const loadCatBreeds = () => {
        onBreedsLoading();
        catService.loadData(BASE_URL + IMAGES + '?breed_ids=' + selectedBreedOption.id, {limit: selectedFilterOption.value})
            .then(onBreedFound)
            .catch(onError)
    }

    const onBreedFound = (res) => {
        const cats = res.map(cat => {
            return {
                id: cat.id,
                url: cat.url
            }
        })

        setCatBreeds([...cats])
        setLoading(false);
    }

    const onBreedsListLoaded = (res) => {
        const breeds  = res.map(breed => {
            const {id, name} = breed;
            return {
                value: name,
                label: name,
                id: id
            }
        })

        setBreedsOptions(breedOptions => [...breeds]);
        // console.log(catBreeds);
        if (catBreeds.length) setLoading(false);
    }


    // console.log('selected breed:', selectedBreedOption);
    // console.log('selected filter:', selectedFilterOption);
    const colourStyles = {
        control: (styles) => (
            { 
                ...styles, 
                backgroundColor: "white", 
                width: '200px',
                height: '40px',
                border: 0,
                boxShadow: 'none',
                borderRadius: '10px',
            }),
        option: (styles, { isDisabled, isFocused }) => {
            return {
            ...styles,
            backgroundColor: isFocused ? "lightgrey" : "white",
            width: '200px',
            color: "#000",
            cursor: isDisabled ? "not-allowed" : "default",
            };
        },
    };

    function renderItems(arr) {
        // if (!arr.length) {
        //     console.log('any breed');
        //     return (
        //         <div>Select breed to load images</div>
        //     )
        // }
        const items = arr.map(item => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"></img>
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
            <div className="breeds__filter">
                <div className="filter">
                <div id="breeds-filter" className="filter__select">
                    <label className="label">Breed</label>
                    <Select 
                    defaultValue={selectedBreedOption}
                    onChange={setSelectedBreedOption}
                    options={breedOptions}
                    styles={colourStyles}/>
                </div>
                <div id="limit-filter" className="filter__select">
                    <label className="label">Limit</label>
                    <Select 
                    defaultValue={selectedFilterOption}
                    onChange={setSelectedFilterOption}
                    options={limitOptions}
                    styles={colourStyles}/>
                </div>
                <button onClick={loadCatBreeds} className="reload-btn"><img src="images/search.svg"/></button>
                <button onClick={loadCatBreeds} className="reload-btn"><img src="images/reload.svg"/></button>
            </div>
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
