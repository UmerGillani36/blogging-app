import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const SearchBlog = ({ handleSubmit, inputValue, inputChange }) => {
    return (
        <Box  sx={{ marginTop:'20px',position: 'relative'}}>
            <TextField
                label="Search Blog"
                type="search"
                variant="outlined"
                value={inputValue}
                onChange={inputChange}
                sx={{width:'400px',position:'absolute',right:'142px'}}
            />
            <Button
                variant='contained'
                sx={{  width: '120px',height:'56px' ,position:'absolute',right:'20px'}}
                type='submit'
                onClick={handleSubmit}>
                Search</Button>
        </Box>
    )
}

export default SearchBlog