
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

function DataFetching() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('asc')
  const [title, setTitle] = useState('the great gatsby')
  const [author, setAuthor] = useState('')
  const [datePublish,setDatePublish] = useState('')
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setLoading(true)
    axios.get('9781442249073.json',{
      params: {
        title: title
        }
       }) .then((res) => {
        setTitle(res.data.records["/books/OL28570160M"].details.details.title)
        setAuthor(res.data.records["/books/OL28570160M"].details.details.authors[0].name)
        setDatePublish(res.data.records["/books/OL28570160M"].details.details.publish_date)
        setPreview(res.data.records["/books/OL28570160M"].details.preview)
        setPosts(res.data.records["/books/OL28570160M"].details)
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);


  function sorted(){ 
    return [].slice.call(posts).sort(function(a,b){ 
      const isReversed = (sortType === 'asc') ? 1 : -1
      return isReversed * a.title.localeCompare(b.title)
    }); 
  }

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="grid-container">
        
            <div className="row-3">
                <div className='row' style={{ marginTop: '25px' }}>
                 <div className='col'></div>
                 <div className='col'>
                   <button className='button' onClick={()=>setSortType('asc')}>Sort by Asc</button>
                   <button className='button' onClick={()=>setSortType('desc')}>Sort by Desc</button>
                 </div>
                </div>

                <header className="header">
               <h1 align='center'>Bookstore App</h1>
               </header>
              <table>
                  <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publish Date</th>
                  <th>Preview</th>
                  </tr>
                  <tr>
                    <hr />
                  </tr>
                <tbody>
                     <tr>
                       <td>{title}</td>
                       <td>{author}</td>
                       <td>{datePublish}</td>
                       <td>{preview}</td>
                     </tr>
                </tbody>
              </table>
             <footer className='center'>Footer content</footer>
            </div>
           </div>
      
     
      )}
    
    </div>

  );
}

export default DataFetching;