
export const colourStyles = {
    control: (styles) => (
        { 
            ...styles, 
            backgroundColor: "white", 
            width: '200px',
            height: '40px',
            border: 0,
            boxShadow: 'none',
            borderRadius: '10px',
            '@media (max-width: 900px)': {
                width: '100%'
            }
        }),
    option: (styles, { isDisabled, isFocused }) => {
        return {
        ...styles,
        backgroundColor: isFocused ? "lightgrey" : "white",
        width: '200px',
        color: "#000",
        cursor: isDisabled ? "not-allowed" : "default",
        '@media (max-width: 900px)': {
            width: '100%'
        }
        };
    },
};

