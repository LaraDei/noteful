import React from 'react'
import Note from '../Note/Note'
import './MainNotePage.css'
import Context from '../Context'
import {findNote} from '../Helpers'

export default class MainNotePage extends React.Component{
    static contextType = Context
    render(){
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        const note = findNote(notes, noteId) || { content: '' }
    return(
        <div className="MainNotePage">
            <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
            />
            <div className='MainNotePage-content'>
                {note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
                )}
            </div>
        </div>

    )
    }
}