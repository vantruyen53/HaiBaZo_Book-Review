import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewApi, bookApi } from '../../api';
import { toast } from 'react-toastify';

export default function ReviewEdit() {
  const { id } = useParams();
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState<{id:number, title:string}[]>([]);
  const [content, setContent] = useState('')
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    reviewApi.getById(parseInt(id as string)).then(r => {
      setContent(r.data.content)
      setBookId(String(r.data.bookId));
    });
    bookApi.getAll(0, 100).then(r => setBooks(r.data.content));
  }, [id]);

  const handleSubmit = async () => {
    if (!bookId) { setError('* Please enter book name'); return; }
    if (!content.trim()) { setError('* Please enter content'); return; }
    try {
      await reviewApi.update(parseInt(id as string), { bookId:parseInt(bookId), content:content });
      toast.success('Updated!');
      nav('/reviews/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Review &gt; Edit</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Book title</label>
        <select value={bookId} onChange={e => setBookId(e.target.value)}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}>
          <option value="">-- Select Book --</option>
          {books.map(a => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Content</label>
        <input value={content} onChange={e => {setContent(e.target.value.trim()); setError('');}}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}/>
      </div>
      {error && <div style={{color:'red', marginLeft:70}}>{error}</div>}
      <div style={{marginTop:20, marginLeft:70}}>
        <button onClick={handleSubmit}
          style={{background:'#87ceeb', border:'none', padding:'8px 30px',
                  cursor:'pointer', borderRadius:4}}>
          Update
        </button>
      </div>
    </div>
  );
}