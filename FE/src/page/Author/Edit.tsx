import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorApi } from '../../api';
import { toast } from 'react-toastify';

export default function AuthorEdit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    authorApi.getById(parseInt(id as string)).then(r => setName(r.data.name));
  }, [id]);

  const handleSubmit = async () => {
    if (!name.trim()) { setError('* Please enter name'); return; }
    try {
      await authorApi.update(parseInt(id as string), { name });
      toast.success('Updated!');
      nav('/authors/list');
    } catch { toast.error('Failed!'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:15}}>Authors &gt; Edit</h3>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:5}}>
        <label style={{width:60}}>Name</label>
        <input value={name} onChange={e => {setName(e.target.value.trim()); setError('');}}
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