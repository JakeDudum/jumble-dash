import React from 'react';
import "./style.css"

function ProjectButton(props) {

    return (
        <div>
            <button id='delete-project' onClick={() => props.delete(props.id)}>X</button>
            <button className="menuBtn sideBtn active" onClick={() => props.click(props.id)} id={props.id} name={props.name}>{props.name}</button>
        </div>
    );

}
export default ProjectButton