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
    
    render(){
        const { name, id, modified } = this.props
        return(
            
            <div className="note">
                <h2 className="note-title">
                    <Link to={`/note/${id}`}>
                        {name}
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
                        {format(parseISO(modified), 'Do MMM yyyy')}
                    </span>
                    </div>
                </div>
            </div>
            
        )
    }
}