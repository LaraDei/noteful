import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import {countNotesForFolder} from '../Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './MainNav.css'

export default function MainNav(props) {
   
        return (
            <div className="mainNav">
                <ul className="mainNav-list">
                    {props.folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className="mainNav-folder-link"
                                to={`/folder/${folder.id}`}
                            >
                                <span className="mainNav-numOfNotes">
                                    {countNotesForFolder(props.notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="mainNav-button-wrapper">
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='mainNav-add-folder'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Folder
                    </CircleButton>
                </div>
            </div>

        )
    
}