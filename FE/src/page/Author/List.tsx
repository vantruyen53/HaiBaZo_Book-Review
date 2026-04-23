import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { authorApi } from '../../api';
import { toast } from 'react-toastify';

import type { AuthorDTO } from '../../DTO/AuthorDTO';

export default function AuthorList() {
  const [data, setData] = useState<{ content: AuthorDTO[]; totalPages: number }>({ content: [], totalPages: 0 });
  const [page, setPage] = useState(0);

  const load = async () => {
    try {
      const res = await authorApi.getAll(page);
      setData(res.data);
    } catch { toast.error('Load failed'); }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await authorApi.getAll(page);
        setData(res.data);
      } catch { toast.error('Load failed'); }
    };

    void fetchAuthors();
  }, [page]);

  const handleDelete = async (id:number) => {
    if (!window.confirm('Delete?')) return;
    try {
      await authorApi.delete(id);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div style={{padding:20}}>
      <h3 style={{color:'#555', marginBottom:10}}>Authors &gt; List</h3>
      <table style={{borderCollapse:'collapse', width:'100%', maxWidth:600}}>
        <thead>
          <tr style={{background:'#f5f5f5'}}>
            <th style={th}>No</th>
            <th style={th}>Name</th>
            <th style={th}>Books</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((a, i) => (
            <tr key={a.id}>
              <td style={td}>{page * 5 + i + 1}</td>
              <td style={td}>{a.name}</td>
              <td style={td}>{a.booksCount}</td>
              <td style={td}>
                <Link to={`/authors/edit/${a.id}`}>
                  <button style={btnEdit}>✏️</button>
                </Link>
                <button style={btnDel} onClick={() => handleDelete(a.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{marginTop:15, display:'flex', gap:5}}>
        {Array.from({length: data.totalPages}, (_, i) => (
          <button key={i} onClick={() => setPage(i)}
            style={{padding:'4px 10px', background: page===i ? '#888' : '#eee',
                    border:'1px solid #ccc', cursor:'pointer'}}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const th: CSSProperties = { border:'1px solid #ccc', padding:'8px 12px', textAlign:'center' };
const td: CSSProperties = { border:'1px solid #ccc', padding:'6px 12px', textAlign:'center' };
const btnEdit: CSSProperties = { marginRight:4, background:'#ffe', border:'1px solid #ccc', cursor:'pointer', padding:'2px 8px' };
const btnDel: CSSProperties  = { background:'#fee', border:'1px solid #ccc', cursor:'pointer', padding:'2px 8px' };