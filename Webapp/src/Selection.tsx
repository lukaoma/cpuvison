import React from 'react';


export default function Selection(props: any) {
    return (
        <div>
            <input className="imageCheck" id="button" ref={props.buttonRef} type="radio" name="beauty"/>
        </div>
    );
}

