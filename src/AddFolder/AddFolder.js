import React from 'react'
import NotefulForm from '../NotefullForm/NotefulForm'
import Context from '../Context'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './AddFolder.css'



export default class AddFolder extends React.Component {
    static defaultProps = {
        history: {
          push: () => {}
        }
    }
    static contextType = Context;
    
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
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
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
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="AddFolder-control"
                            name="folder"
                            id="folder-name-input"
                            required
                        />
                    </div>
                    <div className="AddFolder-button-wrapper">
                        <button
                            type="submit"
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