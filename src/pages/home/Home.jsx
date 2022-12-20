import React, { Component } from 'react';
import ButtonAppBar from '../../components/ButtonAppBar';
import NoteCard from '../../components/note-card/NoteCard';
import CardNoteList from '../../components/note-list/CardNoteList';
import { getNotes } from '../../services/NoteService';

class Home extends Component {
    constructor(){
        super();
        this.state={
            noteData:[],
            noteList:[]
        }
        console.log("constructor called");
    }
    componentDidMount(){
        getNotes().then((res) => {
            this.setState({
                noteList: res.data.data,
            });
          }).catch((error) =>{
            console.log(error);
          });
    }
    UNSAFE_componentWillMount(){
        console.log("will mount called");
    }

    noteList=(noteArray)=>{
        this.setState({
            noteData:noteArray
        })
    }

    render() {
        return (
            <div className='HomePage'>
                <div>
                    <ButtonAppBar/>
                    <NoteCard getNoteList={this.noteList}/>
                    <CardNoteList noteList = {this.state.noteData.length === 0 ?this.state.noteList : this.state.noteData } getNoteList={this.noteList}/>
                </div>
            </div>
        );
    }
}

export default Home;