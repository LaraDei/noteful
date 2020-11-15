import React from 'react'
import Note from '../Note/Note'
import './MainNotePage.css'
import Context from '../Context'
import {findNote} from '../Helpers'
import PropTypes from 'prop-types'


export default class MainNotePage extends React.Component{
    static contextType = Context
    render(){
        const { notes=[] } = this.context
        const { noteId } = this.props.match.params
        console.log(this.props)
        const note = findNote(notes, noteId) || { content: '' }
        return(
            <div className='MainNotePage'>
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

// MainNotePage.propTypes = {
//     noteId: PropTypes.string
// }

MainNotePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            noteId: PropTypes.string
        }),
    }),
}