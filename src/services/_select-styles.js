
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
        }),
    option: (styles, { isDisabled, isFocused }) => {
        return {
        ...styles,
        backgroundColor: isFocused ? "lightgrey" : "white",
        width: '200px',
        color: "#000",
        cursor: isDisabled ? "not-allowed" : "default",
        };
    },
};

