import RandomCat from '../RandomCat/RandomCat';
import {useState} from 'react';
import TabNavItem from '../TabNavItem/TabNavItem';
import TabContent from '../TabContent/TabContent';
import Breeds from '../Breeds/Breeds';
import Gallery from '../Gallery/Gallery';
import BreedDetails from '../BreedDetails/BreedDetails';

const TabsContainer = (props) => {

    const [activeTab, setActiveTab] = useState("tab2");
    const [activeBreedsChild, setActiveBreedsChild] = useState('breeds-list');
    const [catInfo, setCatInfo] = useState({});

    console.log('cat received', catInfo);

    const showData = (cat) => {
        if (activeBreedsChild === "breeds-list") {
            setActiveBreedsChild('breeds-details')
            setCatInfo(cat)
        }
        if (activeBreedsChild === "breeds-details") {
            setActiveBreedsChild('breeds-list')
            setCatInfo({})
        }
    }

    const content = activeBreedsChild === 'breeds-list' ? <Breeds id="breeds-list" addFavourites={props.addFavourites} showData={showData}/> : <BreedDetails id="breeds-details" showData={showData} catInfo={catInfo}/>

    return (
        <>
            <div className="tabs-container tabs">
                <ul className="tabs__list">
                    <TabNavItem id="tab1" title="Random Cat" activeTab={activeTab} setActiveTab={setActiveTab}></TabNavItem>
                    <TabNavItem id="tab2" title="Breeds" activeTab={activeTab} setActiveTab={setActiveTab}></TabNavItem>
                    <TabNavItem id="tab3" title="Gallery" activeTab={activeTab} setActiveTab={setActiveTab}></TabNavItem>
                    <TabNavItem id="tab4" title="Favourites" activeTab={activeTab} setActiveTab={setActiveTab}></TabNavItem>
                </ul>
                <div className="tabs__content">
                    <TabContent id="tab1" activeTab={activeTab}>
                        <RandomCat addFavourites={props.addFavourites}/>
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        {content}
                        {/* <Breeds id="breeds-list" addFavourites={props.addFavourites} showInfo={showInfo}/>
                        <BreedDetails id="breeds-details" showInfo={showInfo}/> */}
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <Gallery addFavourites={props.addFavourites}/>
                    </TabContent>
                    <TabContent id="tab4" activeTab={activeTab}>
                        <div>Favourites</div>
                    </TabContent>
                </div>
            </div>
        </>
    )
}

export default TabsContainer;