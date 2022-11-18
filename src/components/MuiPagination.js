import React,{useState} from 'react'
import {Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination';

const MuiPagination = ({page,handlePage,totalPages}) => {
   
    return (
        <Stack >
            <Pagination
                count={totalPages}
                page={page}
                defaultPage={1}
                siblingCount={0}
                boundaryCount={2}
                color="primary" 
                onChange={handlePage}
                />
        </Stack>
    )
}

export default MuiPagination