import { API_URL } from "../../utils/_constants";

const Aside = () => {
    return (
        <aside className="wrapper__aside aside">
            <div className="aside__inner">
                <div className="aside__greeting">
                    <img src="images/paw-print.svg" alt="paw"/>
                    <h1 className="aside__heading">Hello, Guest!</h1>
                </div>
                <p className="aside__desc">
                    Here you can find out about cats, browse adorable cat images and choose the best breed for you!
                </p>
                <a href={API_URL} className="aside__button" target="blank">
                    <img src="images/Cat.svg" alt=''></img>
                    Original API
                </a>
            </div>
        </aside>
    )
}

export default Aside;