
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li onClick={handleClick} className={activeTab === id ? "tabs__name active" : "tabs__name"}>
            <button>{ title }</button>
        </li>
    );
};
export default TabNavItem;