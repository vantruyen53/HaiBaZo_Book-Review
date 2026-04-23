import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorApi } from '../../api';
import { toast } from 'react-toastify';

export default function AuthorCreate() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim()) { setError('* Please enter name'); return; }
    try {
      await authorApi.create({ name });
      toast.success('Created!');
      nav('/authors/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Authors &gt; Create</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Name</label>
        <input value={name} onChange={e => {setName(e.target.value.trim()); setError('');}}
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