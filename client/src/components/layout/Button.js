import React from 'react';

const Button =({children,className, onClick, type, style}) => {
    return(
        <button className={className} 
            style={style} 
            onClick = {onClick}
        > 
            {children}
        </button>
    )
};

export default Button;