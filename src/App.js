import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MainNav from './MainNav/MainNav';
import NotePageNav from './NotePageNav/NotePageNav';
import MainNoteList from './MainNoteList/MainNoteList';
import MainNotePage from './MainNotePage/MainNotePage';
import dummyStore from './dummyStore';
import {getNotesForFolder, findNote, findFolder} from './Helpers';
import './App.css';

export default class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
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
                    render={routeProps => (
                        <MainNav
                            folders={folders}
                            notes={notes}
                            {...routeProps}
                        />
                    )}
                />
            ))}
            <Route
                path="/note/:noteId"
                render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    const note = findNote(notes, noteId) || {};
                    const folder = findFolder(folders, note.folderId);
                    return <NotePageNav {...routeProps} folder={folder} />;
                }}
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
                    render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                            <MainNoteList
                                {...routeProps}
                                notes={notesForFolder}
                            />
                         );
                    }}
                />
            ))}
            <Route
                path="/note/:noteId"
                render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    console.log(noteId)
                    const note = findNote(notes, noteId);
                    return <MainNotePage {...routeProps} note={note} />;
                }}
            />
          </>
        )
    }

    render() {
        return (
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
        );
    }
}

