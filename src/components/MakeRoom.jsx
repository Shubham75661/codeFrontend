import { AbsoluteCenter, Box, Button, HStack, Input, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_URL);

const MakeRoom = () => {
    const toast = useToast()
    const [username, setUsername] = useState("")
    const [roomId, setRoomId] = useState("")
    const [joinRoomStatus, setJoinRoomStatus] = useState(false)
    const navigate = useNavigate()

    const joinRoom = async() =>{
        setJoinRoomStatus(true)
        try {
        
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const handleCreateRoomTrue = (data) =>{
            toast({
                title : `room created ${data.roomId}`,
                description : "Room created",
                status : "success",
                duration : 1000
            })
            navigate(`/editor/${data.roomId}/${username}`);
        }
    
        const handleCreateRoomError = (data) =>{
            toast({
                title : `${data.roomId}`,
                status : "error",
                duration : 1000
            })
        }

        socket.on('createRoomTrue', handleCreateRoomTrue);
        socket.on('createRoomError', handleCreateRoomError);
        
        return () => {
            socket.off('createRoomTrue', handleCreateRoomTrue);
            socket.off('createRoomError', handleCreateRoomError);
        };
    }, [toast, username, navigate])
    
    
    const createRoom = () =>{
        if(!username || username.length > 10 || username.length < 2){
            toast({
                title : "Invalid username",
                description : "Username should be 2 to 10 char",
                status : "error",
                duration : 1000
            })
        }
        else if(roomId){
            toast({
                title : "Room Creation failed",
                description : `cannot create a room with Id ${roomId}`,
                status : "error",
                duration : 1000
            })
        }
        else{
            socket.emit('createRoom', {username})
        }
    }

    return (
        <Box height={'100vh'} width={'100vw'}>
            <AbsoluteCenter p = '4' axis='both'>
                <VStack 
                    spacing={4}
                    border='1px solid'
                    borderRadius={4}
                    borderColor='#333'
                    p={7}
                >
                    <Text as='kbd' fontSize='3xl'>Code-Connect</Text>
                    <Input 
                        placeholder='Username' 
                        size='md'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <Input 
                        placeholder='Room ID' 
                        size='md' 
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)} 
                    />
                    <HStack spacing={4}>
                        <Button
                            isLoading = {joinRoomStatus}
                            colorScheme='teal' 
                            variant='outline'
                            onClick={() => joinRoom()}
                        >
                            Join Room
                        </Button>
                        <Button
                            colorScheme='green' 
                            variant='outline'
                            onClick={() => createRoom()}
                        >
                            Create Room
                        </Button>
                    </HStack>
                </VStack>
            </AbsoluteCenter>
        </Box>
    )
}

export default MakeRoom