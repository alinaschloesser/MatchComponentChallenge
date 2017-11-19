import React, { Component } from 'react';
import './App.css';



const Note = props => {

  return(
    <span className="box note">
      <h3 className="title">{props.title}</h3>
        <p>{props.noteBody}</p>
        <div onClick={() => props.deleteNote(props.id)} id={props.id} className="button">delete</div>

    </span>
  )
}

const Modal = props => {
  
  const form = props.form;
  const event = e =>{
    console.log(form);
      console.log(e);
  }

  return(
    <div className="modal" style={{display:props.display}}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Add a Note!</p>
        <button className="delete" onClick={()=>{props.displayModal()}} aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="field">
        <form > 
          <label className="label">Note Title</label>
          <input className="input" palceholder="Title" value={form.title} name="title" onChange={()=>{event()}} />
          </form>
        </div>       
      </section>
      <footer className="modal-card-foot">
        <button className="button" onClick={()=>{props.addNote(); props.displayModal()}}>Save changes</button>
        <button className="button" onClick={()=>{props.displayModal()}}>Cancel</button>
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
    display: true,
    form: {
      id:"",
      title:"",
      noteBody:""
    }
    }

  }

  deleteNote = id => {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  }

  addNote = () => { 
    const newNoteId = this.state.notes.length +1;
    const newNote = {
      id: newNoteId,
      title: this.state.form.title,
      body: this.state.form.noteBody
    }
    this.state.notes.push(newNote);
  }

  displayModal = () => {
    this.setState({display: !this.state.display})
   
  }

  handleChange = (e) => {
    console.log(e);
    let form= this.state.form;
    // form[e.target.name] = e.target.value;

    this.setState({form})
  }

  render() {
    let display = this.state.display ? "none" :"block"
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
          display={display}
          displayModal= {this.displayModal}
          addNote= {this.addNote}
          form= {this.state.form}
          handleChange= {this.handleChange}
        />
      </div>
    );
  }
}

export default App;