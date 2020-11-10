import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import { getNotesForFolder } from '../Helpers'
import Context from '../Context'

import './MainNoteList.css'

export default class MainNoteList extends React.Component {
    static defaultProps = {
        match: {
          params: {}
        }
      }
      
    static contextType = Context
    
    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return(
            <section className='MainNoteList'>
                <ul>
                    {notesForFolder.map(note =>
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
}