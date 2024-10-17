import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { executeCode } from '../api'
import { lang } from '../Assets/lang'
import { title } from 'framer-motion/client'

const Output = ({code, selectedLang}) => {
    const toast = useToast()
    const [output, setoutput] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const submitCode = async() =>{
        if(!code) return
        try {
            setisLoading(true)
            const {run} = await executeCode(lang[selectedLang], code)
            console.log("Output:-",run.output)
            setoutput(run.output)
        } catch (error) {
            console.log(error)
            toast({
                title : "An error occurred",
                description : error.message || "Unable to run code",
                status : "error",
                duration : 6000
            })
        } finally{
            setisLoading(false)
        }
    }
    return (
        <Box w={'50%'}>
            <Text mb = {2} fontSize = 'lg'>Output</Text>
            <Button
                variant='outline'
                colorScheme='green'
                mb={4}
                isLoading = {isLoading}
                onClick={()=>submitCode()}
            >
                Run
            </Button>
            <Box
                height='75vh'
                p={2}
                border='1px solid'
                borderRadius={2}
                borderColor='#333'
            >
                {output ? output : 'Click Run button to see the output'}
            </Box>
        </Box>
    )
}

export default Output