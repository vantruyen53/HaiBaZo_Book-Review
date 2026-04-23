import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookApi, authorApi } from '../../api';
import { toast } from 'react-toastify';

export default function BookCreate() {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('')
  const [authors, setAuthors] = useState<{id:number, name:string}[]>([]);
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    authorApi.getAll(0, 100).then(r => setAuthors(r.data.content));
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) { setError('* Please enter title'); return; }
    if (!authorId.trim()) { setError('* Please enter author'); return; }
    try {
      await bookApi.create({ title: title, authorId: Number(authorId) });
      toast.success('Created!');
      nav('/books/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Books &gt; Create</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value.trim())}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}/>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Author</label>
        <select value={authorId} onChange={e => setAuthorId(e.target.value)}
          style={{border:'1px solid #999', padding:'4px 8px', width:300}}>
          <option value="">-- Select Author --</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
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