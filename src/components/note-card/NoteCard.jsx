import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  InputAdornment,
  InputBase,
  Popover,
  createTheme,
  ThemeProvider,
  IconButton,
  Tooltip,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import { ColorLens } from "@mui/icons-material";

import "./NoteCard.css";
import { Component } from "react";
import { addNote, getColors, getNotes } from "../../services/NoteService";
import ColorPallet from "../color-pallet/ColorPallet";

let theme = createTheme({
  override: {
    MuiButtonBase: {
      root: {
        MuiButton: { root: { backgrondColor: "black", minWidth: "10px" } },
      },
    },
  },
});

export default class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNote: true,
      title: "",
      desc: "",
      isArchived: false,
      isPined: false,
      isColorLenseOpen: false,
      colorList: [],
      choosenColor: "",
      anchorEl:""
    };
  }

  handleInput = (event) => {
    console.log(event.target.id + "" + event.target.value);
    if (event.target.id === "title") {
      this.setState({
        title: event.target.value,
      });
    } else if (event.target.id === "desc") {
      this.setState({
        desc: event.target.value,
      });
    }
  };

  handleNoteAdd = () => {
    this.setState({
      isAddNote: !this.state.isAddNote,
      choosenColor:""
    });
    console.log("Note add Called --" + this.state.title.length);
    if (this.state.title.length > 0 && this.state.desc.length > 0) {
      this.handleSubmit();
    }
  };

  handlePin = () => {
    this.setState({
      isPined: !this.state.isPined,
    });
  };

  handleArchive = () => {
    this.setState({
      isArchived: !this.state.isArchived,
    });
  };

  handleSubmit = async () => {
    console.log("submit called");
    let data = {
      title: this.state.title,
      noteText: this.state.desc,
      archived: this.state.isArchived,
      pined: this.state.isPined,
      color:this.state.choosenColor
    };
    await addNote(data)
      .then((res) => {
        console.log(res);
        getNotes()
          .then((res) => {
            this.props.getNoteList(res.data.data);
          })
          .catch((error) => {
            console.log(error);
          });

        // <CardNoteList parentCallback = {this.getAllNotes}/>
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  getAllNotes = () => {
    getNotes()
      .then((res) => {
        this.setState({
          noteData: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  // handleColorLensOpen = (event) => {
  //   this.setState({
  //     isColorLenseOpen: !this.state.isColorLenseOpen,
  //     anchorEl:event.target
  //   });

  //   getColors()
  //     .then((res) => {
  //       console.log(res.data.data);
  //       this.setState({
  //         colorList: res.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  handleColorPallet = (colorSelected) => {
    this.setState({
      choosenColor: colorSelected
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="NoteCard">
          {this.state.isAddNote ? (
            <div id="take-note">
              <Card sx={{}}>
                <CardActionArea>
                  <CardContent>
                    <div className="TakeNoteDiv">
                      <Typography
                        id="take-note-text"
                        gutterBottom
                        variant="h5"
                        component="div"
                        onClick={this.handleNoteAdd}
                      >
                        Take a note..
                      </Typography>

                      <IconButton className="BtnCreateIcon">
                        <CreateIcon id="create-icon" />
                      </IconButton>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              {/* <div>
              <CreateIcon />
              </div> */}
            </div>
          ) : (
            <div id="take-note">
              <Card style={{ backgroundColor: this.state.choosenColor }}>
                <CardActionArea>
                  <CardContent className="CardContent">
                    <div className="Note">
                      <InputBase
                        placeholder="Title"
                        id="title"
                        onChange={this.handleInput}
                      ></InputBase>
                      <br />
                      <br />
                      <InputBase
                        placeholder="Take a note.."
                        id="desc"
                        onChange={this.handleInput}
                      ></InputBase>
                    </div>

                    <div>
                      {this.state.isPined ? (
                        <Tooltip title="Pin">
                        <IconButton
                          className="Pinned"
                          style={{ color: "blue" }}
                          onClick={this.handlePin}
                        >
                          <PushPinIcon />
                        </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unpin">
                        <IconButton
                          className="UnPinned"
                          style={{
                            color: "black",
                            height: "38px",
                            width: "38px",
                            borderRadius: "20px",
                          }}
                          onClick={this.handlePin}
                        >
                          <PushPinIcon />
                        </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </CardContent>
                </CardActionArea>
                <div className="NoteBottom">
                  <div className="NoteIcons">
                    <Tooltip title="Collaborator">
                      <IconButton style={{ color: "black" }}>
                        {<GroupAddIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reminder">
                      <IconButton style={{ color: "black" }}>
                        {<AddAlertIcon />}
                      </IconButton>
                    </Tooltip>

                    {/* <div style={{ display: "flex" }}>
                      <Tooltip title="Background Color">
                        <IconButton
                          onClick={this.handleColorLensOpen}
                          title="Background Color"
                        >
                          <ColorLens id="take-note-bottom-button" />
                        </IconButton>
                      </Tooltip>
                      <Popover
                        // id={id}
                        open={this.state.isColorLenseOpen}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleColorLensOpen}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography sx={{ p: 2 }} className="color">
                          {this.state.colorList.map((color, index) => {
                            return (
                              <div key={index}>
                                <IconButton
                                  id="color-lens-choice"
                                  name={color}
                                  style={{
                                    backgroundColor: color.toLowerCase(),
                                  }}
                                  onClick={this.handleChangeCardColor}
                                ></IconButton>
                              </div>
                            );
                          })}
                        </Typography>
                      </Popover>
                    </div> */}
                    <ColorPallet colorPalletProps={this.handleColorPallet}/>

                    {this.state.isArchived ? (
                      <Tooltip title="Archive">
                        <IconButton style={{ color: "blue" }} onClick={this.handleArchive}>
                          {<ArchiveIcon />}
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Archive">
                        <IconButton
                          style={{ color: "black" }}
                          onClick={this.handleArchive}
                        >
                          {<ArchiveIcon />}
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="More">
                      <IconButton style={{ color: "black" }}>
                        {<MoreVertIcon />}
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="NoteClose">
                    <Button onClick={this.handleNoteAdd}>Close</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}
