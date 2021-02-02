import React from 'react';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawerToggler=(props)=>(
    <div onClick={props.clicked}>
        <FontAwesomeIcon icon={faList} color='white' />
    </div>
);

export default drawerToggler;