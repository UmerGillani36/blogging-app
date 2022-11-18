import { Card, Typography ,Box, CardContent, List, ListItem, ListItemText,Divider} from '@mui/material'
import React from 'react'

const Category = ({options,handleCategory}) => {

  return (
        <Box sx={{width:'280px' , margin:'20px'}}>
        <Card elevation={6}>
            <Typography variant='h4' color='white' sx={{padding:'4px',backgroundColor:'black'}}>Categories</Typography>
            <Divider />

            <CardContent sx={{padding:'0px',height:'270px'}}>
                <List sx={{padding:'0px',width:'280px'}}>
                {options.map((item,index)=>(
                   <>                   
                   <ListItem key={index} sx={{textAlign:'center', cursor:'pointer'}}>
                        <ListItemText
                        primary={item}
                        onClick={()=>handleCategory(item)}
                        >

                        </ListItemText>
                    </ListItem>
                    <Divider />
                    </>

                ))}
                </List>
            </CardContent>
        </Card>
        </Box>

    )
}

export default Category