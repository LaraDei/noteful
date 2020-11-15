import React from 'react'
import NotefulForm from '../NotefullForm/NotefulForm'
import Context from '../Context'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './AddFolder.css'
import PropTypes from 'prop-types'



export default class AddFolder extends React.Component {
    constructor(props){
        super(props);
        this.state={
            folderName: {
                value: '',
                touched: false
            }
        }
    }
    
    static defaultProps = {
        history: {
          push: () => {}
        }
    }
    static contextType = Context;

    updateFolderName(name){
        this.setState({folderName: {value: name, touched: true}})
    }
    
    handleSubmit= e => {
      e.preventDefault()
      const folder = {
        name: e.target['folder'].value,
      }
      fetch(`http://localhost:9090/folders/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(folder)
      })
      .then(res => {
        if (!res.ok){
          return res.json().then(e => Promise.reject(e))}
        const newRes = res.json()
        return newRes
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error('add folder ',{ error })
      })
    }

    render(){
        return(
            <section className='AddFolder'>
                <h2>Create a New folder</h2>
                <NotefulForm
                    onSubmit={this.handleSubmit}
                >
                    <h2>Add Folder</h2>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className='AddFolder-control'
                            name='folder'
                            id='folder-name-input'
                            onChange={e => this.updateFolderName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='AddFolder-button-wrapper'>
                        <button
                            type='submit'
                            className="AddFolder-button"
                        >
                            <FontAwesomeIcon icon='check-double' />
                            Save
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}
AddFolder.defaultProps = {
    value: '',
}

AddFolder.propTypes = {
    folderName: PropTypes.shape({
      value: PropTypes.string.isRequired,
      touched: PropTypes.bool,
    }),
    history: PropTypes.shape({
      push: PropTypes.func
    }),
}

