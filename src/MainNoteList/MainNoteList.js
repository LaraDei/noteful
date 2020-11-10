import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './MainNoteList.css'

export default function MainNoteList(props) {
    return(
        <section className='MainNoteList'>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                    <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                    />
                    </li>
                )}
            </ul>
            <div className="MainNoteList-button-wrapper">
                    <CircleButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='MainNoteList-add-note'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Note
                    </CircleButton>
                </div>
        </section>
    )
}