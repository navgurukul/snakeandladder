import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

function QuestionDialog({ open, question, options, selectedOption, onSelectOption, onClose, onSubmit }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{question}</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="question"
          value={selectedOption}
          onChange={(e) => onSelectOption(e.target.value)}
        >
          {options?.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuestionDialog;
