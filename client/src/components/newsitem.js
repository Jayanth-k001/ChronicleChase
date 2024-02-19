import React, { useContext, useState } from 'react'
import './style.css';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context';

export const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    let shareurl = `whatsapp://send?text=${newsUrl}`;
    const {logindata,setLoginData}=useContext(LoginContext)
    const [saved,setSaved]=useState(false);

    const handleSave = async () => {
        const email=logindata.ValidUserOne.email;
        const data1 = await fetch('http://localhost:8000/save', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
               email, title, description, imageUrl, newsUrl, author, date, source
            })
        })
        const res1=await data1.json();
        if(res1.status === 201){
            toast.success(`Article "${title}" is saved`, {
                position: "top-center"
            }) 
            setSaved(true)
     }
     else{
         toast.success("Couldn't Save the Article", {
             position: "top-center"
         })
     }
    }



    return (
        <>
            <div className="my-3">
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className=" btn btn-dark" >Read More</a>
                        <button className={`btn btn-outline bg-secondary ${!saved?'text-light':'text-dark'}`} style={{ marginLeft: "40px" }} onClick={handleSave}><BookmarksIcon /></button>
                        <br></br>
                        <div id="share" style={{ margin: "10px" }}>
                            <a href={shareurl} data-action="share/whatsapp/share" style={{ color: "black" }}>
                                <ShareIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
};
