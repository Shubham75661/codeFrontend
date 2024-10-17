import axios from "axios";

const versions ={
    'cpp' : '10.2.0',
    'javascript' : '18.15.0'
}

const API = axios.create({
    baseURL : "https://emkc.org/api/v2/piston"
})

export const executeCode = async(language, code) =>{
    const response = await API.post('/execute',{
        language : language,
        version : versions[language],
        files : [
            {
                content : code
            }
        ]
    })
    return response.data
}

export const getLang = async() =>{
    const response = await API.get('/runtimes')
    console.log(response.data)
    return response.data
}