import './App.css';
import { Routes,Route, } from 'react-router-dom';
import {News} from './components/news'
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Navbar } from './components/navbar';
import { FetchNews } from './components/fetchNews';
import { Saved } from './components/saved';


function App() {
  return (
    <> 

       
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/general' element={<News  key="general" category="general" />} ></Route>
      <Route path='/science' element={<News  key="science" category="science" />} ></Route>
      <Route path='/technology' element={<News  key="technology" category="technology" />} ></Route>
      <Route path='/business' element={<News  key="business" category="business" />}></Route>
      <Route path='/health' element={<News  key="health" category="health" />}></Route>
      <Route path='/sports' element={<News  key="sports" category="sports" />}></Route>
      <Route path='/entertainment' element={<News  key="entertainment" category="entertainment" />}></Route>
      <Route path='/display' element={<FetchNews/>}></Route>
      <Route path='/saved' element={<Saved/>}></Route>
    </Routes>
    
    </>
  );
}

export default App;
