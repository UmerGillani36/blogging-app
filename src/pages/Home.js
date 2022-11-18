import React, { useEffect, useState } from 'react'
import Blogs from '../components/Blogs'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Typography, Divider, Card } from '@mui/material';
import SearchBlog from '../components/SearchBlog'
// import { useNavigate } from 'react-router-dom';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';
import MuiPagination from '../components/MuiPagination';
const Home = () => {

  const [data, setData] = useState();
  const [page,setPage]=useState(1);
  const [latestBlog, setLatestBlog] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isCategoryMode, setIsCategoryMode] = useState(false);
  const [start,setStart]=useState(0);
  const [end,setEnd]=useState(5);
  const [totalPages,setTotalPages]=useState(1);

  const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];
  useEffect(() => {

    onLoadData(start,end);
    getLatestBlogs();

  }, [start,end]);

  const handlePage=(e,value)=>{
    let previousValue=page;
    const limit=value-previousValue;
    
    if(limit>=1){
        for (let index = 0; index < limit; index++) {
              setStart(start+5);
              setEnd(end+5)          
        }
    }
    else{
      for (let index = limit; index < 0; index++) {
        setStart(start-5);
        setEnd(end-5) 
        
      }
    }
    // console.log("start = ",start , "end = ",end);
    setPage(value)
}

  const getLatestBlogs = async () => {
    const allBlogs = await axios.get('http://localhost:5000/blogs');
    // console.log(allBlogs.data.length)
    if (allBlogs.data.length >= 4) {

      const start = allBlogs.data.length - 4;
      const end = allBlogs.data.length;
      const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
      if (response.status === 200) {
        setLatestBlog(response.data)
        // console.log(latestBlog);
      }
      else {
        toast.error("Something Went Wrong")
      }

    }

  }
  const handleBack = () => {
    setIsCategoryMode(false);
    onLoadData(start,end);
  }
  const onLoadData = async (start,end) => {
    const allBlogs = await axios.get('http://localhost:5000/blogs');
    setTotalPages(Math.ceil(allBlogs.data.length/5));
    const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
    if (response.status === 200) {
      setData(response.data)
    }
    else {
      toast.error("Something went wrong!!");
    }

  }
  const excerpt = (str) => {
    if (str.length > 80) {

      str = str.substring(0, 80) + " ... ";
    }
    else {
      str = str.substring(0, str.length) + " .................................. ";
    }
    return str;
  }

  const DeleteBlog = async (id) => {

    // console.log("Delete is calling",id);
    if (window.confirm("Are you sure you want to delete your blog?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog is Deleted successfully.");
        onLoadData(start,end);
      }
      else {
        toast.error("Something went wrong!!");
      }

    }
  }

  const handleCategory = async (category) => {
    const response = await axios.get(`http://localhost:5000/blogs?category=${category}`)
    if (response.status === 200) {
      setData(response.data)
      setIsCategoryMode(true);
    } else {
      toast.error("Something went wrong");
      setIsCategoryMode(false);

    }
  }

  const inputChange = (e) => {
    if (!e.target.value) {
      onLoadData(start,end);
    }
    setInputValue(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/blogs?q=${inputValue}`);
    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error("Somethig went wrong");
    }
  }

  // console.log(data);
  return (
    <>
      <div style={{ height: '56px' }}>
        {
          isCategoryMode && (
            <Button variant='contained' size='large' color='error'
              sx={{ position: 'absolute', left: '20px', height: '56px' }}
              onClick={handleBack}
            >Back</Button>)
        }
        <SearchBlog handleSubmit={handleSubmit} inputValue={inputValue} inputChange={inputChange} />
      </div>
      <div className='Container'>
        <div className='BlogsContainer'>
          {
            data ?
              data.map((element) => (
                <Blogs
                  {...element}
                  key={element.id}
                  excerpt={excerpt}
                  DeleteBlog={DeleteBlog}
                />

              )) : "Loading"
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Card sx={{ width: '280px', margin: '30px 20px 20px 20px' }}>
            <Typography variant='h4' color='white' sx={{ backgroundColor: 'black', padding: '4px' }}>Related Post</Typography>
            <Divider />
            {
              latestBlog && latestBlog.map((item, index) => (
                <LatestBlog {...item} key={index}></LatestBlog>
              ))

            }
            {/* <LatestBlog /> */}
          </Card>
          <Category options={options} handleCategory={handleCategory} />
        </div>
      </div>
      <div className='Pagination'>
        <MuiPagination page={page} handlePage={handlePage} totalPages={totalPages}/>
      </div>
    </>
  )
}

export default Home