import React, { Component } from 'react';
import './App.css';



const Note = props => {

  return(
    <div className="box note">
      <p className="title noteTitle">{props.title}</p>
        <p className="noteBody">{props.noteBody}</p>
        <div onClick={() => props.deleteNote(props.id)} id={props.id} className="button">delete</div>
    </div>
  )
}

class Modal extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      form:{
        id:"",
        title:"",
        noteBody:""
      }
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let form= this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form})
  }
  

  render(){
  
    return(
      <div className="modal" style={{display:this.props.display}}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add a Note!</p>
            <button className="delete" onClick={()=>{this.props.displayModal()}} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <form > 
              <div className="field">         
                <label className="label">Note Title</label>
                <input className="input" palceholder="Title" value={this.state.form.title} name="title" onChange={this.handleChange} />
              </div>
              <div className="field">         
                <label className="label">Note Body</label>
                <input className="input" palceholder="Text" value={this.state.form.noteBody} name="noteBody" onChange={this.handleChange} />
              </div>
            </form>       
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={()=>{this.props.addNote(this.state.form); this.props.displayModal(); this.setState({form:{
        id:"",
        title:"",
        noteBody:""
      }})}}>Save changes</button>
            <button className="button" onClick={()=>{this.props.displayModal()}}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
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

  addNote = (form) => { 
    const newNoteId = Date.now();
    const newNote = {
      id: newNoteId,
      title: form.title,
      noteBody: form.noteBody
    }
    this.state.notes.push(newNote);

  }

  displayModal = () => {
    this.setState({display: !this.state.display})
   
  }

  

  render() {
    let display = this.state.display ? "none" :"block"
    return (
      <div className="app clearfix">
       <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title headerTitle">Notes</h1>
                    <h3 className="subtitle headerSubtitle">make a new note or remove an existing one</h3>
                    <button className="button" onClick={() =>{this.displayModal()}} type="button">New Note</button>
                </div>
            </div>
        </section>
    
            <div className="container noteContainer clearfix">
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