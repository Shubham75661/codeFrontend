import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { boilerPlateCode } from '../Assets/boilerPlate';
import Output from './Output';
import { lang } from '../Assets/lang';

function CodeEditor() {
    const ShowLang = Object.entries(lang)
    const [selectedLang, setselectedLang] = useState('javascript')
    const [code, setCode] = useState(boilerPlateCode[selectedLang]);

    const handleLangChange = (lang) =>{
        setCode(boilerPlateCode[lang])
        setselectedLang(lang)
    }
  
    return (
        <Box>
            <HStack spacing={4}>
                <Box w={'50%'}>
                    <Text mb = {2} fontSize = 'lg'>languages</Text>
                    <Box mb = {4}>
                        <Menu 
                            isLazy
                        >
                            <MenuButton as={Button}>
                                {selectedLang}
                            </MenuButton>
                            <MenuList>
                                {ShowLang.map(([lang, name]) => (
                                    <MenuItem key={lang} onClick={() =>handleLangChange(lang)}>{lang}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Box>
                    <Editor
                        height="75vh"
                        language={selectedLang} // Set the programming language for syntax highlighting
                        theme="vs-dark"      // You can set the theme (light or dark)
                        value={code}
                        onChange={(value) => setCode(value)}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false }, // Disable minimap if needed
                        }}
                    />
                </Box>
                {
                    selectedLang ?
                    <Output code={code} selectedLang={selectedLang}/>
                    :
                    null
                }
            </HStack>
            
            {/* <button onClick={() => submitCode()}>Submit</button> */}
        </Box>
    );
}

export default CodeEditor;
