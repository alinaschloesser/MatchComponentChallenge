import React, { Component } from 'react';
import './App.css';



const Note = props => {

  return(
    <span className="box note">
      <h3 className="title">{props.title}</h3>
        <p>{props.noteBody}</p>
        <div onClick={() => props.deleteNote(props.id)} id={props.id} className="button">edit</div>

    </span>
  )
}

const Modal = props => {
  return(
    <div className="modal" style={{display:props.display}}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Modal title</p>
        <button className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        stuff goes here
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success">Save changes</button>
        <button className="button">Cancel</button>
      </footer>
    </div>
  </div>
  )
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes:[
      {
        id:0,
        title:"Note One",
        noteBody:"This is a note"
      },
      {
        id:1,
        title:"Note Two",
        noteBody:"I am a note that works"
      },
      {
        id:2,
        title:"Note Three",
        noteBody:"I am another note"
      }
      ],
    display: "none"
    }
    // this.handleClicks = this.handleClicks.bind(this);
  }

   deleteNote = id => {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  }

  addNote = (title, body) => { 
    const newNoteId = this.state.notes.length -1;
    const newNote = {
      id: newNoteId,
      title: title,
      body: body
    }
    this.state.notes.push(newNote);
  }

  displayModal = () => {
    this.setState({display:"block"})
   
  }

  render() {
    return (
      <div className="app clearfix">
       <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Notes</h1>
                    <h3 className="subtitle">make a new note or remove an existing one</h3>
                    <button className="button" onClick={() =>{this.displayModal()}} type="button">New Note</button>
                </div>
            </div>
        </section>
   
        <section className="section clearfix">
            <div className="container">
              {this.state.notes.map((note)=>
                <Note 
                  key= {note.id}
                  id= {note.id}
                  title={note.title}
                  noteBody={note.noteBody}
                  deleteNote= {this.deleteNote}
                />
              )}
            </div>
        </section> 
        <Modal 
          display={this.state.display}
        />


      </div>
    );
  }
}

export default App;