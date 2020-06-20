import React, { useState, useEffect } from "react";
import './styles.css';

export default function Input(props){

    const [ txt, setText ] = useState('');

    useEffect(()=>{
        props.onChangeText(txt);
    }, [ txt ]);

    return(
        <input type="text" 
            className="repository-input"
            placeholder={props.title}
            value={txt}
            onChange={(e) => setText(e.target.value)}
        />
    );
}