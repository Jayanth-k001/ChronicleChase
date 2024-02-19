import React, { useState,useEffect, useContext } from 'react'
import { Navbar } from './navbar'
import { LoginContext } from './context';
import { SavedNewsItem } from './savedNewsItem';
import { Newsitem } from './newsitem';



export const Saved = () => {
  const [articles,setarticles]=useState([]);
  const { logindata, setLoginData } = useContext(LoginContext);
  const email = logindata.ValidUserOne.email;


  const getdata = async () => {

    const data = await fetch(`http://localhost:8000/saved/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    });
    let res = await data.json();
    setarticles(res.savedArticles.articles);
    console.log(articles);

  }
  useEffect(() => {
    getdata()
  }, [articles]);


  return (
    <>
      <Navbar />
      <div className="container my-4 text-center pt-40">
        <br></br>
        <br></br>
        <br></br>
         {articles.length===0?<h2 className="md-10">NewsFeed - No Articles Found....</h2>: <h2 className="md-10">NewsFeed -Your Saved Articles....</h2>}
        <div className="row">
          {articles.map((element) => {
            console.log(element.newsUrl)
            return (
              <div className="col-md-3" key={element.url}>
                <SavedNewsItem

                  title={element.title}
                  description={element.description}
                  imageUrl={element.imageUrl}
                  newsUrl={element.newsUrl}
                  author={element.author}
                  date={element.date}
                  source={element.source.name}
                />
              </div>
            );
          })}

        </div>
      </div>
    </>
  )
}
