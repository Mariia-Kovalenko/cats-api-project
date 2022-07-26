import CatService from "../../services/CatService";
import { Component } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import {BASE_URL, IMAGES} from '../../services/_constants'

class RandomCat extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        cat: {},
        loading: true,
        error: false
    }

    catService = new CatService();

    componentDidMount() {
        this.loadCat();
    }

    onCatLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCatLoaded = (cat) => {
        // console.log(cat);
        this.setState({cat: cat[0], loading: false})
    }

    loadCat = () => {
        this.onCatLoading();
        this.catService
            .loadData(BASE_URL + IMAGES, {limit: 1, order: 'Desc', page: this.getRandomPage()})
                .then(this.onCatLoaded)
                .catch(this.onError)
    }

    getRandomPage = () => {
        return Math.floor(Math.random() * 3000);
    }

    addFavourites = (cat, mark) => {
        this.props.addFavourites(cat, mark);
        this.loadCat();
    }

    render() {

        let {cat, loading, error} = this.state;
        // console.log(cat);
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
                    <button  className="cat__button dislike">
                        <img src="images/dislike-white.svg" alt='dislike'></img>
                    </button>
    
                    <button onClick={this.loadCat} className="cat__button like">
                        <img src="images/heart-white.svg" alt='like'></img>
                    </button>
    
                    <button onClick={() => this.addFavourites(cat, 'fav')} className="cat__button fav">
                        <img src="images/star-white.svg" alt='fav'></img>
                    </button>
                </div>
            </div>
        )
    }
}

const View = ({cat}) => {

    let {id, url} = cat;
    // console.log('cat', id);

    return (
        <div className="random-cat__image">
            <img src={url} alt='cat'/>
        </div>
    )
}

export default RandomCat;