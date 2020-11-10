import React from 'react'
import Note from '../Note/Note'
import './MainNotePage.css'

export default function MainNotePage(props) {
    console.log(props)
    return(
        <div className="MainNotePage">
            <Note
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
            />
            <div className='MainNotePage-content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i}>{para}</p>
                )}
            </div>
        </div>

    )
}