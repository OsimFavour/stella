import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'


function CustomCard() {
    const [btnColor, setBtnColor] = useState('error')

    return (
    <div style={{
        width: '100%', 
        border: '2px solid red', 
        padding: '15px'
        }}>
        <Typography variant='h4'>This is the title</Typography>
        <Typography variant='body1'>
            It is a long established fact that a reader will 
            be distracted bby the readable content of a page 
            when looking at it's layout
        </Typography>
        <Button
            onClick={() => setBtnColor('success')}
            variant='contained'
            size='medium'
            sx={{
                backgroundColor: 'yellow'
            }}>
            GO
        </Button>
    </div>
  )
}

export default CustomCard
