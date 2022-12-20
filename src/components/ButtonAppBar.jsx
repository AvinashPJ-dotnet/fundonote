import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ViewListIcon from '@mui/icons-material/ViewList';
import "./ButtonAppBar.css";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="ToolBar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div id="note-icon">
            <TextSnippetIcon />
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FunDoNotes
          </Typography>
          <div className="SearchText">
            <TextField
              id="search-text"
              name="searchText"
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
          
          <ViewListIcon/>
          

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
