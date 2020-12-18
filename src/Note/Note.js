import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../Context'
import './Note.css'
import Error from '../errorBoundary'
import PropTypes from 'prop-types'

export default class Note extends React.Component{
    static defaultProps ={
        onDeleteNote: () => {},
        history: {
            push: () => {}
          },
    }
 
    static contextType = Context

    handleClickDelete = (e) => {
        e.preventDefault()
        const noteId = this.props.id
        console.log(noteId)
        console.log(this.context)
        console.log(this.props)
        fetch(`https://vast-wildwood-60540.herokuapp.com/api/notes/${noteId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            this.props.history.push(`/`)
        })
        .catch(error => {
            console.error({error})
        })
    }

    render(){
        const { name, id, modified } = this.props
        return(
            
            <div className='note'>
                <Error>
                <h2 className='note-title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className='note-delete'
                    onClick={this.handleClickDelete}
                >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    remove
                </button>
                <div className='note-dates'>
                    <div className='note-modified'>
                    Modified {' '}
                    <span className='mod-date'>
                        {modified}
                    </span>
                    </div>
                </div>
                </Error>
            </div>
            
        )
    }
}

Note.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    modified: PropTypes.string,
    onDeleteNote: PropTypes.func
}