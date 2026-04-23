import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewApi, bookApi } from '../../api';
import { toast } from 'react-toastify';

export default function ReviewCreate() {
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState<{id:number, title:string}[]>([]);
  const [content, setContent] = useState('')
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
      bookApi.getAll(0, 100).then(r => setBooks(r.data.content));
    }, []);

  const handleSubmit = async () => {
    if (!bookId) { setError('* Please enter book name'); return; }
    if (!content.trim()) { setError('* Please enter content'); return; }
    try {
      await reviewApi.create({ bookId: parseInt(bookId), content: content });
      toast.success('Created!');
      nav('/reviews/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Review &gt; Create</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Book name</label>
        <select value={bookId} onChange={e => setBookId(e.target.value.trim())}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}>
          <option value="">-- Select Book --</option>
          {books.map(a => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Content</label>
        <input value={content} onChange={e => {setContent(e.target.value); setError('');}}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}/>
      </div>
      {error && <div style={{color:'red', marginLeft:70, marginBottom:10}}>{error}</div>}
      <div style={{marginTop:20, marginLeft:70}}>
        <button onClick={handleSubmit}
          style={{background:'#87ceeb', border:'none', padding:'8px 30px',
                  cursor:'pointer', borderRadius:4, fontSize:14}}>
          Create
        </button>
      </div>
    </div>
  );
}