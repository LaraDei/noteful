import React from 'react'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'


export default function Note(props){
    console.log(props.id)
    return(
        <div className="note">
            <h2 className="note-title">
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className="note-delete">
                <FontAwesomeIcon icon='trash-alt' />
                {' '}
                remove
            </button>
            <div className="note-dates">
                <div className="note-modified">
                Modified {' '}
                <span className='mod-date'>
                    {format(parseISO(props.modified), 'Do MMM yyyy')}
                </span>
                </div>
            </div>
        </div>
    )
    }