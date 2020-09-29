import React from 'react'

function Dropdown (props) {
    const {title, options, onChange} = props

    if(options){
        return (
            <>
                <select name={title} id={title} onChange={onChange}>
                    <option value=''> </option>
                    {options.length > 0 && options.map(
                        item => <option key={options.indexOf(item)} value={item}>{item}</option>
                    )}
                </select>
            </>
        )
    } else {
        return (
            <>
                <select name={title} id={title}></select>
            </>
        )
    }
}

export default Dropdown
