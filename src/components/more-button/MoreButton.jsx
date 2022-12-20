import { IconButton, Tooltip } from '@mui/material';
import React, { Component } from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";

class MoreButton extends Component {
    render() {
        return (
            <div>
                <Tooltip title="More">
                  <IconButton style={{ color: "black" }}>
                    {<MoreVertIcon />}
                  </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default MoreButton;