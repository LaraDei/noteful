import React from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../Context'
import './Note.css'


export default class Note extends React.Component{
    static defaultProps ={
        onDeleteNote: () => {},
    }

    static contextType = Context

    handleClickDelete = (e) => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            // allow parent to perform extra behaviour
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render(){
        const { name, id, modified } = this.props
        return(
            
            <div className="note">
                <h2 className="note-title">
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className="note-delete"
                    onClick={this.handleClickDelete}
                >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    remove
                </button>
                <div className="note-dates">
                    <div className="note-modified">
                    Modified {' '}
                    <span className='mod-date'>
                        {format(parseISO(modified), 'do MMM yyyy')}
                    </span>
                    </div>
                </div>
            </div>
            
        )
    }
}