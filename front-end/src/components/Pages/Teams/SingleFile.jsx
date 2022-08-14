import React from "react";
import PopOutContainer from "../../commonComponents/PopOutContainer";
import folder from '../../../folder.png';
import docker from '../../../docker.png';
import github from '../../../github.png';
import './css/SingleFile.css';
import SimpleButton from "../../commonComponents/SimpleButton";
import { useState } from "react";
import { useEffect } from "react";


export default function SingleFile({data})
{
    const [download, setDownload] = useState(false);
    const [error, setError] = useState();
    useEffect(()=>{
        if (download) {
            fetch(
                'http://localhost/api/project/download',
                {
                    method:'POST',
                    headers: {
                        api_token: sessionStorage.getItem('api_token')
                            ?sessionStorage.getItem('api_token')
                            :localStorage.getItem('api_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({file_id:data.id})
                }
            ).then(res=>res.blob())
            .then(blob=> {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .then(res=>{
                setDownload(false);
            })
            .catch(err=>setError(err))
        }
    },[download]);

    const clickHandle = () => {
        setDownload(true);
    }
    return (
        <PopOutContainer passedStyle={{height: 'fit-content'}}>
            <div className="file-info-container">
                <img src={data.repository === 'local'?folder:data.repository === 'dockerhub'?docker:github} alt="" />
                {
                    data.repository === 'dockerhub' || data.repository === 'github'
                        ?<a href={data.path}>{data.path}</a>
                        :<>
                            <div className="">{data.file_title?data.file_title:data.path}</div>
                            <SimpleButton type={'button'} value={'download'} clickHandle={clickHandle}/>
                        </>
                }  
            </div>
        </PopOutContainer>
    )
}