import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {countNotesForFolder} from '../Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './MainNav.css'
import Context from '../Context'
import Error from '../errorBoundary'
//import PropTypes from 'prop-types'


export default class MainNav extends React.Component {
    static contextType = Context
    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='mainNav'>
                <ul className='mainNav-list'>
                    <Error>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='mainNav-folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='mainNav-numOfNotes'>
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                    </Error>
                </ul>
                <div className='mainNav-button-wrapper'>
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
}

