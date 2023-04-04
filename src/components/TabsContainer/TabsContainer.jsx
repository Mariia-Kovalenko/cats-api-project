import RandomCat from '../RandomCat/RandomCat';
import {useState} from 'react';
import TabNavItem from '../TabNavItem/TabNavItem';
import TabContent from '../TabContent/TabContent';
import Breeds from '../Breeds/Breeds';
import Gallery from '../Gallery/Gallery';
import BreedDetails from '../BreedDetails/BreedDetails';
import Favourites from '../Favourites/Favourites';
import { TAB1, TAB1_TITLE, TAB2, TAB2_TITLE, TAB3, TAB3_TITLE, TAB4, TAB4_TITLE } from '../../utils/_constants';

const TabsContainer = ({ addFavourites }) => {
    const [activeTab, setActiveTab] = useState(TAB2);
    const [activeBreedsChild, setActiveBreedsChild] = useState('breeds-list');
    const [catInfo, setCatInfo] = useState({});

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

    const content = activeBreedsChild === 'breeds-list' ? 
        <Breeds 
            id="breeds-list" 
            addFavourites={addFavourites} 
            showData={showData}
        /> : 
            <BreedDetails 
                id="breeds-details" 
                showData={showData} 
                catInfo={catInfo}
            />

    return (
        <>
            <div className="tabs-container tabs">
                <ul className="tabs__list">
                    <TabNavItem 
                        id={TAB1} 
                        title={TAB1_TITLE} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                    <TabNavItem 
                        id={TAB2} 
                        title={TAB2_TITLE}
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                    <TabNavItem 
                        id={TAB3} 
                        title={TAB3_TITLE}
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                    <TabNavItem 
                        id={TAB4} 
                        title={TAB4_TITLE}
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                </ul>
                <div className="tabs__content">
                    <TabContent id={TAB1} activeTab={activeTab}>
                        <RandomCat addFavourites={addFavourites}/>
                    </TabContent>
                    <TabContent id={TAB2} activeTab={activeTab}>
                        {content}
                    </TabContent>
                    <TabContent id={TAB3} activeTab={activeTab}>
                        <Gallery addFavourites={addFavourites}/>
                    </TabContent>
                    <TabContent id={TAB4} activeTab={activeTab}>
                        <Favourites/>
                    </TabContent>
                </div>
            </div>
        </>
    )
}

export default TabsContainer;