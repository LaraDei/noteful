import React from 'react'
import NotefulForm from '../NotefullForm/NotefulForm'
import Context from '../Context'
import './AddNote.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationError from "../ValidationError/ValidationError"
import PropTypes from 'prop-types'

export default class AddNote extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            name: {
                value: '',
                touched: false,
                valid: false,
            },
        }
    }

    static defaultProps = {
        history: {
          push: () => {}
        },
    }

    static contextType = Context

    updateName= name => {
        this.setState({ name: { value: name, touched: true }});
      };

    validateName= () => {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Note name can not be blank.'
        }
      }

    handleSubmit = e => {
        e.preventDefault();
        const note = {
            note_name: e.target['note'].value,
            content: e.target['note-content'].value,
            folder_id: e.target['note-folder-id'].value,
            modified: new Date().toISOString(),
        }
        console.log(note.modified)
        fetch('https://vast-wildwood-60540.herokuapp.com/api/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note),
        })
        .then(res => {
            if(!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folder_id}`)

        })
        .catch(error => {
            console.error('add note ',{ error })
        })
    } 

    render(){
        const nameError = this.validateName();
        const { folders=[] } = this.context
        return(
            <section className='AddNote'>
                <h2>Create a New Note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <h2>Add Note</h2>
                    <div className='form-group'>
                        <label htmlFor='note-name'>Name</label>
                        <input
                            type='text'
                            className='AddNote-control'
                            name='note'
                            id='note-name-input'
                            onChange={e => this.updateName(e.target.value)} 
                            required/>
                        {this.state.name.touched && (<ValidationError message={nameError} />)}
                        <label htmlFor='content'>Content</label>
                        <textarea
                            type='text'
                            className='AddNote-control'
                            name='note-content'
                            id='note-content-input'
                            required/>
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>Folder</label>
                        <select id='note-folder-select' name='note-folder-id' required> 
                            <option value="" >...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.folder_name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='AddNote-button-wrapper'>
                        <button
                            type='submit'
                            className='AddNote-button'
                            >
                            <FontAwesomeIcon icon='check-double' />
                            Add Note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}
AddNote.defaultProps = {
    name: {},
}
AddNote.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    name: PropTypes.shape({
        name: PropTypes.object.isRequired,
    })
}