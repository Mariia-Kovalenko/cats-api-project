import { ADD_FAVOURITES, DELETE, DISLIKE, INFO, LIKE, RELOAD, SEARCH } from "../../utils/_constants";

const ActionButton = ({action, imageSrc, text, onClick}) => {
    let btnClassName = 'btn ';

    switch (action) {
        case LIKE:
            btnClassName += 'cat__button like';
            break;
        case DISLIKE:
            btnClassName += 'cat__button dislike';
            break;
        case ADD_FAVOURITES:
            btnClassName += ''
            break;
        case INFO:
            btnClassName += 'btn-info';
            break;
        case DELETE:
            btnClassName += 'delete';
            break;
        case SEARCH:
            btnClassName += 'reload-btn';
            break;
        case RELOAD:
            btnClassName += 'reload-btn';
            break;
    
        default:
            break;
    }

    return (
        <button onClick={onClick} className={btnClassName}>
            {imageSrc ? 
                <img src={imageSrc} alt={action}></img> : text
            }
        </button>
    )
}

export default ActionButton;