import { Box, Card, Typography, Divider, CardContent,Avatar} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LatestBlog = ({imageUrl , title , id}) => {
    return (
        
            <>
           
            <Link to={`/blog/${id}`} style={{textDecoration:'none',color:'black'}}>

                <CardContent sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Avatar
                        alt={imageUrl}
                        src={imageUrl}
                        sx={{ width: 56, height: 56 }}
                    />
                    <Typography  variant='body2' sx={{flexGrow:2,fontSize:'18px'}} >{title}</Typography>
                   
                </CardContent>
                <Divider />

                </Link>
                </>
    )
}

export default LatestBlog