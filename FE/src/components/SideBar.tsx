import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Authors', base: '/authors', subs: ['List', 'Create'] },
  { label: 'Books',   base: '/books',   subs: ['List', 'Create'] },
  { label: 'Reviews', base: '/reviews', subs: ['List', 'Create'] },
];

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <aside style={{width:220, background:'#f0f0f0', minHeight:'100vh', padding:'10px 0'}}>
      {menuItems.map(item => (
        <div key={item.label}>
          <div
            onClick={() => setOpen(o => ({...o, [item.label]: !o[item.label]}))}
            style={{display:'flex', justifyContent:'space-between', padding:'10px 15px',
                    cursor:'pointer', fontWeight:'bold', alignItems:'center'}}
          >
            <span>
              <span style={{display:'inline-block', width:14, height:14,
                            background:'yellow', border:'1px solid #999', marginRight:8}}/>
              {item.label}
            </span>
            <span>{open[item.label] ? '∧' : '∨'}</span>
          </div>
          {open[item.label] && item.subs.map(sub => (
            <Link key={sub} to={`${item.base}/${sub.toLowerCase()}`}
              style={{display:'block', padding:'6px 15px 6px 35px', textDecoration:'none',
                      color:'#333', background: location.pathname.includes(`${item.base}/${sub.toLowerCase()}`) ? '#ddd' : 'transparent'}}>
              {sub}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}