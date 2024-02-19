import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Newsitem } from "./newsitem";
import { Spinner } from "./loader";
import { Navbar } from "./navbar";

export const News = (props) => {
  const apiKey = "6a87d4e26bd04d989a0f62bd4e67b40f";
  const pageSize = 20;
  const bottomRef = useRef(null);

  const makeFirstCapital = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const [author, setauthor] = useState(null);
  const [publishedAt, setpublishedAt] = useState(null);
  const [loadingstate, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(20);
  const [source, setsource] = useState(null);
  const [articles, setarticles] = useState([]);

  const getdata = () => {
    setloading(true);

    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6a87d4e26bd04d989a0f62bd4e67b40f&category=${props.category}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((res) => {
        setauthor(res.author);
        setpublishedAt(res.publishedAt);
        setloading(false);
        settotalResults(res.totalResults);
        setsource(res.source);
        setarticles(res.articles);

      })


  }
  useEffect(() => {
    getdata()
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [articles])

  let nextClick = () => {
    if (Math.ceil((totalResults) / pageSize) > page) {
      const getdata = () => {
        setloading(true);

        fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6a87d4e26bd04d989a0f62bd4e67b40f&category=${props.category}&page=${page + 1}&pageSize=${pageSize}`)
          .then((res) => res.json())
          .then((res) => {
            setauthor(res.author);
            setpublishedAt(res.publishedAt);
            setsource(res.source);
            setarticles(res.articles);

          })
        setloading(false);
        setpage((page) => page + 1);
      };

      getdata();

    }

  }
  let prevClick = () => {

    const getdata = () => {
      setloading(true);

      fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6a87d4e26bd04d989a0f62bd4e67b40f&category=${props.category}&page=${page - 1}&pageSize=${pageSize}`)
        .then((res) => res.json())
        .then((res) => {
          setauthor(res.author);
          setpublishedAt(res.publishedAt);
          setsource(res.source);
          setarticles(res.articles);

        })
      setloading(false);
      setpage((page) => page - 1);
    };

    getdata();

  }


  return (
    <>
      <Navbar />
      <div ref={bottomRef} className="container my-4 text-center pt-40">
        <br></br>
        <br></br>
        <br></br>
        <h2 className="md-10">NewsFeed - Top {makeFirstCapital(props.category)} Headlines</h2>
        {loadingstate === true ? <Spinner /> : ""}
        <div className="row">
          {loadingstate === false && articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <Newsitem

                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}

        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button type="button" disabled={page < 2} className="btn btn-dark" onClick={prevClick} > &larr; Previous</button>

          <button type="button" disabled={page >= Math.ceil((totalResults) / pageSize)} className="btn btn-dark" onClick={nextClick}>  Next &rarr; </button>
        </div>
      </div>


    </>

  )
}