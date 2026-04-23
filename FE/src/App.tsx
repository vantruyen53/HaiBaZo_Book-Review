import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/SideBar';

import AuthorList   from './page/Author/List';
import AuthorCreate from './page/Author/Create';
import AuthorEdit   from './page/Author/Edit';

import BookList from './page/Book/List';
import BookCreate from './page/Book/Create';
import BookEdit from './page/Book/Edit';

import ReviewList from './page/Review/List';
import ReviewCreate from './page/Review/Create';
import ReviewEdit from './page/Review/Edit';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
        {/* Header */}
        <div style={{background:'#222', color:'white', padding:'12px 20px',
                     fontWeight:'bold', fontSize:16}}>
          HAIBAZO BOOK REVIEW
        </div>
        <div style={{display:'flex', flex:1}}>
          <Sidebar />
          <main style={{flex:1, padding:10}}>
            <Routes>
              <Route path="/" element={<Navigate to="/authors/list" />} />
              <Route path="/authors/list"      element={<AuthorList />} />
              <Route path="/authors/create"    element={<AuthorCreate />} />
              <Route path="/authors/edit/:id"  element={<AuthorEdit />} />
              
              <Route path="/" element={<Navigate to="/books/list" />} />
              <Route path="/books/list"      element={<BookList />} />
              <Route path="/books/create"    element={<BookCreate />} />
              <Route path="/books/edit/:id"  element={<BookEdit />} />
              
              <Route path="/" element={<Navigate to="/reviews/list" />} />
              <Route path="/reviews/list"      element={<ReviewList />} />
              <Route path="/reviews/create"    element={<ReviewCreate />} />
              <Route path="/reviews/edit/:id"  element={<ReviewEdit />} />
            </Routes>
          </main>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}