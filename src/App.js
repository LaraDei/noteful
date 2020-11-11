import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import MainNav from './MainNav/MainNav'
import NotePageNav from './NotePageNav/NotePageNav'
import MainNoteList from './MainNoteList/MainNoteList'
import MainNotePage from './MainNotePage/MainNotePage'
import Context from './Context'
import './App.css'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'


export default class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch('http://localhost:9090/notes'),
            fetch('http://localhost:9090/folders')
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = folder =>{
        this.setState(
            {
              folders: [...this.state.folders, folder]
            },
            
        )
    }

    handleAddNote = note =>{
        this.setState(
            {
              notes: [...this.state.notes, note]
            },
        )
    }


    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
          <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={MainNav}
                />
            ))}
            <Route
                path="/note/:noteId"
                component={NotePageNav}
            />
            <Route path="/add-folder" component={NotePageNav} />
            <Route path="/add-note" component={NotePageNav} />
            
          </>
        )
    }

    renderMainRoutes(){
        const {notes} = this.state;
        return(
          <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={MainNoteList}
                />
            ))}
            <Route
                path="/note/:noteId"
                component={MainNotePage}
            />
            <Route path="/add-folder" component={AddFolder} />
            <Route path="/add-note" component={AddNote} />
          </>
        )
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
        };
        return (
            <Context.Provider value={value}>
                <div className="App">
                    <nav className="app-nav">
                        {this.renderNavRoutes()}
                    </nav>
                    <header className='app-header'>
                        <h1>
                            <Link to='/'>Noteful</Link>
                            <FontAwesomeIcon icon="check-double" />
                        </h1>     
                    </header>
                    <main className="app-main">
                        {this.renderMainRoutes()}
                    </main>
                </div>
            </Context.Provider>
        );
    }
}

