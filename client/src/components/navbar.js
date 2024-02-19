import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const [query,setQuery]=useState('');
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch=()=>{
        history(`/display?query=${query}`);
        
    }

    const logout = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:8000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },

        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }
    const goDash = () => {
        history("/general")
    }

    const saved=()=>{
        history('/saved');
    }

    return (
        < nav className="navbar navbar-expand-lg navbar-light bg-secondary fixed-top" >
            <div className="container-fluid">
                <h3>NewsFeed</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" ><Link className="nav-link h5 active" to="/general">General</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/science">Science</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/technology">Technology</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/business">Business</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/health">Health</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/sports">Sports</Link></li>
                        <li className="nav-item"><Link className="nav-link h5" to="/entertainment">Entertainment</Link></li>



                    </ul>
                    <div class="d-flex" >
                        <input class="form-control me-2"  onKeyDown={(e)=>{
                e.keyCode===13 && e.shiftKey===false && handleSearch();
            }} type="search"  value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search with keywords" aria-label="Search" />
                        <button class="btn btn-outline bg-dark text-light me-5"  type="submit" onClick={handleSearch}>Search</button>
                    </div>
                    <div className='avtar'>

                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div>
                    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button', }}  >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <MenuItem onClick={() => { goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => { goDash()
                                        handleClose()
                                        saved()
                                    }}>Saved articles</MenuItem>
                                    <MenuItem onClick={() => {
                                        logout()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }
                    </Menu>
                </div>
            </div>
        </nav >
    )


}