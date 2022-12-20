import React, { Component } from "react";

import {
    Popover,
    IconButton,
    Tooltip,
    Typography
  } from "@mui/material";
import { ColorLens } from "@mui/icons-material";
import { getColors } from "../../services/NoteService";

class ColorPallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isColorLenseOpen: false,
      colorList: [],
      choosenColor: "",
      anchorEl: "",
    };
  }

  handleColorLensOpen = (event) => {
    this.setState({
      isColorLenseOpen: !this.state.isColorLenseOpen,
      anchorEl:event.target
    });

    getColors()
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          colorList: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChangeCardColor = (event) => {
    this.props.colorPalletProps(event.target.value.toLowerCase())
  };

  render() {
    return (
      <div>
       
          <Tooltip title="Background Color">
            <IconButton
              onClick={this.handleColorLensOpen}
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
                    <Tooltip title={color}>
                    <IconButton
                      id="color-lens-choice"
                      value={color}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      onClick={this.handleChangeCardColor}
                    ></IconButton>
                    </Tooltip>
                  </div>
                );
              })}
            </Typography>
          </Popover>
        </div>
    );
  }
}

export default ColorPallet;
