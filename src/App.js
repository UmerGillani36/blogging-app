import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import {   Routes , Route} from 'react-router-dom';
import Header from './components/Header';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header/>
            <Routes>
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/home' element={<Home/>}></Route>
                  <Route path='/about' element={<About/>}></Route>
                  <Route path='/addblog' element={<AddEditBlog/>}></Route>
                  <Route path='/editblog/:id' element={<AddEditBlog/>}></Route>
                  <Route path='/blog/:id' element={<Blog/>}></Route>
                  <Route path='*' element={<NotFound/>}></Route>
            </Routes>
    
    </div>
  );
}

export default App;
