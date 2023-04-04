const TabContent = ({ id, activeTab, children }) => {
    return (
        activeTab === id ? <div className="tabContent">
            {children}
        </div> : null
    )
};

export default TabContent;
