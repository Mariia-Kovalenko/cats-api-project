import { useState, useEffect } from "react";
import CatService from "../../services/CatService";
import {BASE_URL, BREEDS, IMAGES} from '../../services/_constants'

const BreedDetails = (props) => {
    const cat = props.catInfo;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [breeds, setBreeds] = useState([cat.url]);

    let urlsLoaded = false;
    const catService = new CatService();

    useEffect(() => {
        getBreedImages()
    }, [])

    const onImagesLoaded = (res) => {
        const catUrls = res.map(cat => cat.url);

        if (!urlsLoaded) {
            urlsLoaded = true;
            setBreeds([...catUrls]);
        }
    }

    const getBreedImages = () => {
        console.log('request');
        catService.loadData(BASE_URL + IMAGES + '?breed_ids=' + cat.breedId, {limit: 4})
                .then(onImagesLoaded)
                .catch(err => {
                    console.log(err);
                })
    }
    const previousSlide = () => {
        if (currentSlide - 1 < 0) {
            setCurrentSlide(breeds.length - 1)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const nextSlide = () => {
        if (currentSlide + 1 > breeds.length - 1) {
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }

    function renderDots() {
        const dots = [];
        for (let index = 0; index < breeds.length; index++) {
            let classList = 'dot ';
            if (index === currentSlide) {
                classList += 'active'
            }
            dots.push((<div key={index} className={classList}></div>))
        }
        return dots;
    }
    
    function renderDescription(cat) {
        const {breed} = cat;
        return (
            <div className="cat__info">
                <div className="cat__slider slider">
                    <button id="prevBtn"
                    onClick={previousSlide}>
                        <img src="images/arrow-point-to-left.svg" alt="prev"></img>
                    </button>
                    <button id="nextBtn"
                    onClick={nextSlide}>
                        <img src="images/arrow-point-to-right.svg" alt="next"></img>
                    </button>
                    <div className="slider__slides">
                        <div className="slide">{renderImg(currentSlide)}</div>
                    </div>
                    <div className="dots">
                        {renderDots()}
                    </div>
                </div>
                <div className="cat__description description">
                    <div>
                        <h3 className="description__name">{breed.name}</h3>
                        <p className="description__text">{breed.description}</p>
                        <div className="description__traits">
                            <div className="trait">
                                <div className="trait__title">Temper:</div>
                                <div className="trait__text">{breed.temperament}</div>
                            </div>
                            <div className="trait">
                                <div className="trait__title">Weigth:</div>
                                <div className="trait__text">{breed.metric}</div>
                            </div>
                            <div className="trait">
                                <div className="trait__title">Origin:</div>
                                <div className="trait__text">{breed.origin}</div>
                            </div>
                            <div className="trait">
                                <div className="trait__title">Life span:</div>
                                <div className="trait__text">{breed.life_span}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderImg(currentSlide) {
        const url = breeds[currentSlide];
        console.log(url);
        if (url) {
            return (
                <div className="description__img">
                    <img src={url}></img>
                </div>
            )
        }
        return null;
    }
    const content = renderDescription(cat);
    return (
        <>
            {content}
            <button className="back-btn" onClick={props.showData}>Back to Breeds</button>
        </>
    )
}

export default BreedDetails;