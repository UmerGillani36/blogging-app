import React from 'react';
import {  Box,Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
const Blogs = ({id,title , description , imageUrl , category ,excerpt ,DeleteBlog}) => {
const categories={
  Travel:'primary',
  Fashion:'secondary',
  Fitness:'error',
  Sports:'warning',
  Food:'info',
  Tech:'success'
}
  const navigate=useNavigate();
  return (
    <Box>
    <Box sx={{margin:'30px 20px 30px 20px'}} width='300px'>
    <Card sx={{height:'400px'}} elevation={10}>
        <CardMedia component='img' src={imageUrl} height="180x" alt={imageUrl}></CardMedia>
        <CardContent>
            <Typography component='div' variant='h5' gutterBottom>{title}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {excerpt(description)}
              <Link to={`/blog/${id}`}>Read More</Link>
            </Typography>
            <Typography  component='div' variant='h5' color='text.secondary'>
                <Chip  sx={{marginTop:'8px',width:'110px'}} label={category} size='large' color={categories[category]}></Chip>
            </Typography>
        </CardContent>
        <CardActions sx={{padding:'0px',display:'flex', justifyContent:'space-evenly'}}>
            
            <Button variant='contained' size='medium'  onClick={()=>{navigate(`/editblog/${id}`)}}>Edit</Button>
            <Button variant='contained' color='error'size='medium' onClick={()=>DeleteBlog(id)}>Delete</Button>
            
        </CardActions>
    </Card>
    </Box>
    </Box>
  )
}

export default Blogs