import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import source from "../Assets/source.gif";

const Winner = ({ opene, winn, cresult }) => {
    const [open, setOpen] = React.useState(opene);

    React.useEffect(() => {
        setOpen(opene);
    }, [opene]);

    const handleClose = () => {
        setOpen(false);
        cresult(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'black',
                    color: 'white',
                    borderRadius: '10px',
                    border: '2px solid #f00',
                },
            }}
        >
            <DialogTitle>
                <Typography variant="h6" component="span">
                    Player {winn} Won
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <img src={source} alt="Celebration" style={{ maxWidth: '100%', borderRadius: '10px' }} />
            </DialogContent>
        </Dialog>
    );
};

export default Winner;
