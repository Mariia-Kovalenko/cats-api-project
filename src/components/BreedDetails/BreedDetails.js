
const BreedDetails = (props) => {

    const cat = props.catInfo;
    
    function renderDescription(cat) {
        const {url, breed} = cat;
        return (
            <div className="cat__info">
                <div className="cat__slider">
                    {renderImg(url)}
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

    function renderImg(url) {
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