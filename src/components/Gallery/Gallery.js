import { useState, useEffect } from "react";
import CatService from "../../services/CatService";
import Select from "react-select";
import { colourStyles } from "../../utils/_select-styles";
import {
    ADD_FAVOURITES,
    ANY_CATEGORY,
    BASE_URL,
    BREEDS,
    CATEGORIES,
    DATA_LIMIT,
    IMAGES,
    NOT_FOUND_MESSAGE,
} from "../../utils/_constants";
import Loader from "../../common/Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ActionButton from "../../common/ActionButton/ActionButton";
import Filter from "../Filter/Filter";

const Gallery = (props) => {
    let breedsOptions = [{ value: ANY_CATEGORY, label: "Any" }];

    let categoriesOptions = [{ value: ANY_CATEGORY, label: "Any" }];
    const [selectedBreedOption, setSelectedBreedOption] = useState(
        breedsOptions[0]
    );
    const [breedOptions, setBreedsOptions] = useState(breedsOptions);
    const [categoryOptions, setCategoryOptions] = useState(categoriesOptions);
    const [selectedCategory, setSelectedCategory] = useState(
        categoriesOptions[0]
    );
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(8);

    let catsLoaded = false;

    useEffect(() => {
        onRequest();
        // loadCatImages();
    }, []);

    const onLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    const addFavourites = (imageId) => {
        props.addFavourites(imageId);
    };

    const onRequest = () => {
        onLoading();

        CatService.loadData(BASE_URL + BREEDS, { limit: DATA_LIMIT })
            .then((res) => {
                const breeds = res.map((breed) => {
                    const { id, name } = breed;
                    return {
                        value: name,
                        label: name,
                        id: id,
                    };
                });

                CatService.loadData(BASE_URL + CATEGORIES)
                    .then((res) => {
                        const categories = res.map((category) => {
                            const { id, name } = category;
                            return {
                                value: name,
                                label: name,
                                id: id,
                            };
                        });

                        if (!catsLoaded) {
                            catsLoaded = true;
                            loadCatImages();
                        }
                        setBreedsOptions((breedOptions) => [
                            ...breedOptions,
                            ...breeds,
                        ]);
                        setCategoryOptions((categoryOptions) => [
                            ...categoryOptions,
                            ...categories,
                        ]);
                    })
                    .catch(onError);
            })
            .catch(onError);
    };

    const onCatsLoaded = (res) => {
        const newCats = res.map((cat) => {
            const { id, url } = cat;

            return {
                id: id,
                url: url,
            };
        });
        setCats([...newCats]);
        setLoading(false);
    };

    const loadCatImages = () => {
        onLoading();

        const category =
            selectedCategory.id === ANY_CATEGORY ? "" : selectedCategory.id;
        const breed =
            selectedBreedOption.id === ANY_CATEGORY
                ? ""
                : selectedBreedOption.id;

        CatService.loadData(BASE_URL + IMAGES, {
            limit: limit,
            category_ids: category,
            breed_ids: breed,
        })
            .then(onCatsLoaded)
            .catch(onError);
    };

    function renderItems(arr) {
        if (!arr.length) {
            return <div className="not-fount-message">{NOT_FOUND_MESSAGE}</div>;
        }

        const items = arr.map((item) => {
            return (
                <div key={item.id} className="grid-item">
                    <img className="grid-cat" src={item.url} alt="cat"></img>
                    <div className="item-hover-trigger">
                        <div className="like-btns-white">
                            <ActionButton
                                action={ADD_FAVOURITES}
                                onClick={() => addFavourites(item.id)}
                                imageSrc={"images/heart-pink.svg"}
                            />
                        </div>
                    </div>
                </div>
            );
        });

        return <div className="grid-block">{items}</div>;
    }

    const items = renderItems(cats);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Loader /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="gallery">
            <div className="component__filter">
                <Filter
                    breedsFilter={{
                        show: true,
                        defaultValue: selectedBreedOption,
                        onChange: setSelectedBreedOption,
                        options: breedOptions
                    }}
                    categoryFilter={{
                        show: true,
                        defaultValue: selectedCategory,
                        onChange: setSelectedCategory,
                        options: categoryOptions
                    }}
                    onSearch={loadCatImages}
                    onReload={loadCatImages}
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

export default Gallery;
