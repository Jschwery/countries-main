"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

export default function SelectAutoWidth({
  filterType,
}: {
  filterType: string;
}) {
  const [age, setAge] = React.useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 110 }}
        size="small"
        className={`fade-in ${visible ? "visible" : ""}`}
      >
        <InputLabel
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          id="demo-simple-select-autowidth-label"
        >
          <span className=" self-center">{filterType}</span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
