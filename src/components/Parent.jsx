import { Box } from '@chakra-ui/react'
import React from 'react'
import CodeEditor from './Editor'

const Parent = () => {
  return (
    <Box
        minH="100vh" 
        bg="#0f0a19"
        color="gray.500"
        px={6}
        py={8}
    >
        <CodeEditor/>
    </Box>
  )
}

export default Parent