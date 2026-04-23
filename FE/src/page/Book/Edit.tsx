import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookApi, authorApi } from '../../api';
import { toast } from 'react-toastify';

export default function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('')
  const [authors, setAuthors] = useState<{id:number, name:string}[]>([]);
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    bookApi.getById(parseInt(id as string)).then(r => {
      setTitle(r.data.title);
      setAuthorId(String(r.data.authorId));
    });
    authorApi.getAll(0, 100).then(r => setAuthors(r.data.content));
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) { setError('* Please enter name'); return; }
    if (!authorId.trim()) { setError('* Please enter author'); return; }
    try {
      await bookApi.update(parseInt(id as string), { title, authorId: Number(authorId) });
      toast.success('Updated!');
      nav('/books/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Books &gt; Edit</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Title</label>
        <input value={title} onChange={e => {setTitle(e.target.value.trim()); setError('');}}
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