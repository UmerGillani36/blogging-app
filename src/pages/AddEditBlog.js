import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


//tbr86s1j
const AddEditBlog = () => {



  const initialState = {
    title: '',
    description: '',
    imageUrl: '',
    category: ''
  }
  const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const [desError, setDesError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [catError, setCatError] = useState(false);
  const [isEditMode,setIsEditMode]=useState(false);
  const { title, description, imageUrl, category } = formValue;
  const {id}=useParams();

  useEffect(()=>{
      if(id){
          setIsEditMode(true);
          getSingleBlog(id);
      }else{
        setIsEditMode(false);
        setFormValue({initialState});
      }

  },[id])


  const getSingleBlog= async(id)=>{

    const singleBlog= await axios.get(`http://localhost:5000/blogs/${id}`);
    
    if(singleBlog.status===200){

      setFormValue({...singleBlog.data})
    }else{

      toast.error("something went wrong");
    }
  }

  const handleInput = (e) => {
    let { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value })
    if (description) {

      setDesError(false);
    }
    if (title) {

      setTitleError(false);
    }
  }


  const handleCategory = (e) => {
    // console.log(e.target.value);
    setFormValue({ ...formValue, category: e.target.value })
    setCatError(false)
  }


  const onUploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tbr86s1j');

    axios.post('https://api.cloudinary.com/v1_1/umergilani/image/upload', formData)
      .then((response) => {
        toast.success("Image Upload Successfully!!!")
        setFormValue({ ...formValue, imageUrl: response.data.url })
      })
      .catch(() => { toast.error('SomeThing Wrong!!!') })

  }

  const getDate = () => {

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!isEditMode){
      if (!description) {
        setDesError(true)
      }
      if (!title) {
        setTitleError(true)
      }
      if (!category) {
        setCatError(true)
      }
  
      if (title && description && imageUrl && category) {
  
        const currentDate = getDate();
  
        const updatedData={...formValue,date:currentDate}
  
       const response= await axios.post('http://localhost:5000/blogs',updatedData);
       console.log(response);
       if(response.status===201){
        toast.success("Form is successfully uploaded.");
    }
    else{
      toast.error("Something went wrong..");
    }
  
    }
    
    }
    else{
      const updatedData={...formValue}
      const response= await axios.put(`http://localhost:5000/blogs/${id}`,updatedData);
      // console.log(response);
      if(response.status===200){
       toast.success("Form is successfully updated.");
   }
   else{
     toast.error("Something went wrong..");
   }

    }
    setFormValue({title:'',description:'',imageUrl:'',category:''});
    navigate('/');
  }


  return (
    <Box sx={{ width: '100vw', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
      <Box spacing={4} sx={{ margin: '20px', width: '500px' }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            width: '500px',
            padding: '10px 4px'

          }}>
          <Typography variant='h2' color='primary' >{isEditMode?"Edit Blog":"Add Blog"}</Typography>


          <TextField
            sx={{ margin: '10px' }}
            value={title || ""}
            onChange={handleInput}
            required
            id="title"
            label="Title"
            variant="outlined"
            helperText={!title ? "Please enter the description." : "  "}
            error={titleError}

          />

          <TextField
            value={description || ""}
            sx={{ margin: '10px' }}
            multiline
            maxRows={4}
            minRows={4}
            onChange={handleInput}
            required
            id="description"
            label="Description"
            helperText={!description ? "Please enter the description." : "  "}
            error={desError}
            variant="outlined"

          />

        {
        !isEditMode&&(
        <> 
         <TextField
            type='file'
            onChange={(e) => { onUploadImage(e.target.files[0]) }}
            sx={{ margin: '10px' }}
            required
          />
          </>
        )
          }

          <TextField
            sx={{ margin: '10px' }}
            select
            color='primary'
            value={category}
            onChange={handleCategory}
            required
            id="select"
            label="Categories"
            variant="outlined"
            helperText={!category ? "Please enter the description." : "  "}
            error={catError}
          >

            {options.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '8px 0px' }}>
            <Button variant='contained' color='primary' size='large' onClick={handleSubmit}> {isEditMode?"Update":"Add"}</Button>
            <Button variant='contained' color='error' size='large' onClick={() => { navigate('/') }}>Back</Button>
          </Box>


        </Paper>
      </Box>
    </Box>
  )
}

export default AddEditBlog