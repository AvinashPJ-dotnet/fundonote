import { Card } from "@mui/material";
import React, { Component } from "react";
import { getNotes, updateColors } from "../../services/NoteService";
import ColorPallet from "../color-pallet/ColorPallet";
import EditNoteDialog from "../edit-note-dialog/EditNoteDialog";
import MoreButton from "../more-button/MoreButton";
import "./CardNoteList.css";

class CardNoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteData: [],
      choosenColor: "",
      displayListBottomTools: false,
      displayListBottomToolsIndex: 0,
      selectedValue: "",
      isEditNoteDialogOpened: false,
      isEditNoteDialogClosed: true,
    };
  }
  componentDidMount = () => {
    console.log("come from add note");
    this.getAllNotes();
  };

  getAllNotes = () => {
    getNotes()
      .then((res) => {
        this.props.getNoteList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleColorPallet = (selectedColor) => {
    console.log("selected color: " + selectedColor);
    this.setState({
      choosenColor: selectedColor,
    });
    let data = {
      color: selectedColor,
    };

    updateColors(data, this.state.displayListBottomToolsIndex)
      .then((res) => {
        console.log(res.data);
        this.getAllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDisplayBottomTools = (event, id) => {
    event.preventDefault();
    this.setState({
      displayListBottomToolsIndex: id,
    });
  };

  handleEditNoteDialog = () => {
    this.setState({
      selectedValue: "",
      isEditNoteDialogOpened: !this.state.isEditNoteDialogOpened,
    });
  };

  handleEditNoteDialogClosed = ()=>{
    this.setState({
      selectedValue: "sdfsdfsdfsdf",
      isEditNoteDialogOpened: !this.state.isEditNoteDialogOpened,
    });
  }
  render() {
    return (
      <div className="CardNoteList">
        <div className="NoteList">
          {this.props.noteList.map((note, index) => {
            return (
              // style={{backgroundColor:note}} add in below div
              <div>
                <Card
                  key={index}
                  value={note.id}
                  style={{ backgroundColor: note.color }}
                  className="NoteDetails"
                  onMouseOver={(event) =>
                    this.handleDisplayBottomTools(event, note.id)
                  }
                  onMouseLeave={(event) =>
                    this.handleDisplayBottomTools(event, -1)
                  }
                  
                >
                  <div className="CardNoteData" onClick={this.handleEditNoteDialog}>
                    <p id="title">{note.title}</p>
                    <p id="note-text">{note.noteText}</p>
                  </div>
                  {this.state.displayListBottomToolsIndex === note.id ? (
                    <div className="CardNoteBottomTools">
                      <ColorPallet colorPalletProps={this.handleColorPallet} />
                      <MoreButton />
                    </div>
                  ) : (
                    <div className="CardNoteBottomTools">
                      
                    </div>
                  )}
                </Card>
                <EditNoteDialog
                  selectedValue={this.state.selectedValue}
                  open={this.state.isEditNoteDialogOpened}
                  onClose={this.handleEditNoteDialogClosed}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardNoteList;
