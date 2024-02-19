import React, { useContext } from 'react'
import './style.css';
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context';
import DeleteIcon from '@mui/icons-material/Delete';

export const SavedNewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    console.log(imageUrl)
    let shareurl = `whatsapp://send?text=${newsUrl}`;
    const {logindata,setLoginData}=useContext(LoginContext);

    const handledelete = async () => {
        const email=logindata.ValidUserOne.email;
        const data1 = await fetch('http://localhost:8000/delete', {
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
            toast.success(`Article "${title}" is deleted`, {
                position: "top-center"
            }) 
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
                        <button className="btn btn-outline bg-secondary text-light" style={{ marginLeft: "40px" }} onClick={handledelete}><DeleteIcon/></button>
                        <br></br>
                        <div id="mobile-share" style={{ margin: "10px" }}>
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
