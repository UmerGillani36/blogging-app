import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Stack, Typography, Button, Chip, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link, useNavigate } from 'react-router-dom';
// import IconButton from '@mui/icons-material'


const Blog = () => {

  const [data, setData] = useState();
  const [relatedBlog, setRelatedBlog] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {

      getBlogData(id);
    }
  }, [id])

  const excerpt = (str) => {
    if (str.length > 80) {

      str = str.substring(0, 80) + " ... ";
    }
    else {
      str = str.substring(0, str.length) + " .................................. ";
    }
    return str;
  }
  const getBlogData = async (id) => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedBlogData = await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`)
    if (response.status === 200 || relatedBlogData === 200) {
      setData(response.data)
      setRelatedBlog(relatedBlogData.data)
    } else {
      toast.error("Something went wrong");
    }
  }

  const imageStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '10px',

  }
  const categories = {
    Travel: 'primary',
    Fashion: 'secondary',
    Fitness: 'error',
    Sports: 'warning',
    Food: 'info',
    Tech: 'success'
  }
  return (
    <>
      {
        data && (
          <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '85%', backgroundColor: '#d3d3d329' }}>
              <Stack sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant='contained' size='large' color='error'
                  sx={{ margin: '10px' }}
                  onClick={() => navigate('/')}
                >Back</Button>
                <Typography variant='h2' component='div' color='text.secondary' sx={{ flexGrow: 3 }}>{data.title}</Typography>
              </Stack>
              <img style={imageStyle} src={data.imageUrl} alt={data.imageUrl}></img>
              <Stack sx={{ backgroundColor: '#897b7b29', display: 'flex', flexDirection: 'row', margin: '10px 0px 10px 0px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton arial-label='date' size='small'><DateRangeIcon /></IconButton>
                  <Typography variant='h6' color='text.primary'>{data.date}</Typography>
                </Stack>
                <Chip label={data.category} size='large' sx={{ fontWeight: 'bold', fontSize: '20px', width: '120px' }} color={categories[data.category]}></Chip>
              </Stack>
              <Typography sx={{ margin: '20px 0px 10px 0px' }} variant='body1' color='text.primary'>{data.description}</Typography>

            </Box>
          </Box>)
      }
      {
        relatedBlog && relatedBlog.length > 0 && (
          <>
            {relatedBlog.length > 1 && (<h1>Related Blogs</h1>)}

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {

                relatedBlog.filter((blog) => blog.id != id).map((blog) => (
                  <Box p={4} width='300px' >
                    <Card key={blog.imageUrl} sx={{ height: '400px' }}>
                      <CardMedia
                        component='img'
                        onClick={() => navigate(`/blog/${blog.id}`)}
                        src={blog.imageUrl}
                        height="180px"
                        alt={blog.imageUrl}>

                      </CardMedia>
                      <CardContent>
                        <Typography component='div' variant='h5' gutterBottom>{blog.title}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {excerpt(blog.description)}
                          <Link to={`/blog/${id}`}>Read More</Link>
                        </Typography>

                      </CardContent>

                    </Card>
                  </Box>
                ))
              }
            </Box>
          </>
        )
      }

    </>
  )
}

export default Blog