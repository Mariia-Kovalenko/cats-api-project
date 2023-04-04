const Popup = ({setShowPopup, message }) => {
    return (
        <div className={'popup'}>
            <div className="popup__inner">
                { message }
                <button className='button__ok' onClick={() => setShowPopup(false)}>OK</button>
            </div>
        </div>
    )
}

export default Popup;