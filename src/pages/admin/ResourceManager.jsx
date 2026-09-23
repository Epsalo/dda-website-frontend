import React from "react";
import { Plus, Pencil, Trash2, X, RefreshCw, Eye } from "lucide-react";
import ImageField from "../../components/ImageField";

const toInputValue = (value, type) => {
  if (value == null) return type === "checkbox" ? false : "";
  if (type === "checkbox") return Boolean(value);
  if (type === "select") return String(value);
  if (type === "datetime-local") {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  if (type === "date") {
    const s = String(value); return s.length >= 10 ? s.slice(0, 10) : s;
  }
  return value;
};

const slugify = (text) => String(text).toLowerCase().trim()
  .replace(/[^a-z0-9\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");

const normalize = (data, fields) => {
  const out = { ...data };
  fields.forEach(f => {
    const value = out[f.name];
    if (value === "" && f.optional) { delete out[f.name]; return; }
    if (f.type === "number" && value !== "" && value != null) out[f.name] = Number(value);
    if (f.numeric && value !== "" && value != null) out[f.name] = Number(value);
    if ((f.type === "date" || f.type === "datetime-local") && value) out[f.name] = new Date(value).toISOString();
    if (f.type === "checkbox") out[f.name] = Boolean(value);
  });
  return out;
};

export default function ResourceManager({title,description,load,create,update,remove,fields,transform=(x)=>x,allowCreate=true}) {
  const [items,setItems]=React.useState([]), [loading,setLoading]=React.useState(true);
  const [editing,setEditing]=React.useState(null), [viewing,setViewing]=React.useState(null), [saving,setSaving]=React.useState(false), [error,setError]=React.useState("");
  const empty=Object.fromEntries(fields.map(f=>[f.name,f.default ?? (f.type === "checkbox" ? false : "")]));
  const refresh=React.useCallback(()=>{setLoading(true);setError("");return load().then(setItems).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[load]);
  React.useEffect(()=>{refresh();},[refresh]);

  const openCreate=()=>setEditing({id:null,data:{...empty}});
  const openEdit=item=>setEditing({id:item.id,data:Object.fromEntries(fields.map(f=>[f.name,toInputValue(item[f.name],f.type)]))});
  const change=(name,value)=>setEditing(x=>({...x,data:{...x.data,[name]:value}}));
  const submit=async e=>{
    e.preventDefault();setSaving(true);setError("");
    try {
      const payload={...editing.data};
      if(fields.some(f=>f.name==="slug")&&String(payload.slug??"").trim()===""){
        const source=payload.title??payload.name??"";
        if(String(source).trim()!=="")payload.slug=slugify(source);
      }
      const data=normalize(transform(payload, Boolean(editing.id)), fields);
      editing.id?await update(editing.id,data):await create(data);
      setEditing(null); await refresh();
    }
    catch(e){setError(e.message)} finally{setSaving(false)}
  };
  const del=async id=>{if(!window.confirm("Delete/deactivate this item?"))return;try{await remove(id);await refresh()}catch(e){setError(e.message)}};
  const labelFor=f=>f.label || f.name;

  return <div>
    <div className="admin-page-title"><div><span className="eyebrow">CONTENT</span><h1>{title}</h1><p>{description}</p></div>
      <div className="admin-title-actions">{allowCreate&&<button className="btn btn-primary" onClick={openCreate}><Plus size={17}/>Add new</button>}<button className="icon-btn" onClick={refresh} title="Refresh"><RefreshCw size={17}/></button></div>
    </div>
    {error&&<div className="form-error admin-error">{error}</div>}
    {editing&&<div className="modal-backdrop"><div className="admin-modal"><button className="modal-close" onClick={()=>setEditing(null)}><X/></button><h2>{editing.id?"Edit":"Create"} {title.replace(/s$/i,"")}</h2>
      <form onSubmit={submit} className="admin-form">{fields.map(f=>{const required=editing.id?Boolean(f.requiredOnEdit??f.required):Boolean(f.requiredOnCreate??f.required);const value=editing.data[f.name]??(f.type === "checkbox" ? false : "");return f.type==="image"?<ImageField key={f.name} label={labelFor(f)} value={value} onChange={v=>change(f.name,v)} required={required} />:<label key={f.name} className={f.type === "checkbox" ? "checkbox-field" : ""}>
        {f.type==="checkbox"?<><input type="checkbox" checked={Boolean(value)} onChange={e=>change(f.name,e.target.checked)}/><span>{labelFor(f)}</span></>:<>{labelFor(f)}{f.type==="textarea"?<textarea rows="5" value={value} onChange={e=>change(f.name,e.target.value)} required={required}/>:f.type==="select"?<select value={value} onChange={e=>change(f.name,e.target.value)} required={required}><option value="">Select...</option>{(f.options||[]).map(o=><option value={o.value} key={o.value}>{o.label}</option>)}</select>:<input type={f.type||"text"} value={value} onChange={e=>change(f.name,e.target.value)} required={required} placeholder={f.placeholder||""}/>}</>}</label>})}
        <button className="btn btn-primary btn-full" disabled={saving}>{saving?"Saving...":"Save changes"}</button></form></div></div>}
    {viewing&&<div className="modal-backdrop"><div className="admin-modal"><button className="modal-close" onClick={()=>setViewing(null)}><X/></button><h2>View {title.replace(/s$/i,"")}</h2><div className="record-details">{Object.entries(viewing).filter(([k,v])=>k!=="passwordHash"&&v!==null&&v!==undefined&&typeof v!=="object").map(([key,value])=><div key={key}><small>{key.replace(/([A-Z])/g," $1")}</small><strong>{typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}</strong></div>)}</div></div></div>}
    <div className="admin-table-wrap">{loading?<div className="table-empty">Loading...</div>:!items.length?<div className="table-empty">No records yet.</div>:<table className="admin-table"><thead><tr><th>Title / Name</th><th>Status</th><th>Created</th><th></th></tr></thead><tbody>{items.map(i=><tr key={i.id}><td><strong>{i.title||i.name||i.fullName||i.label||i.subject||i.caption||`#${i.id}`}</strong><small>{i.slug||i.email||i.description||i.role||""}</small></td><td><span className={`status-pill status-${String(i.status||"").toLowerCase()}`}>{i.status|| (i.isActive===false?"Inactive":i.isPublished===false?"Unpublished":"Active")}</span></td><td>{i.createdAt?new Date(i.createdAt).toLocaleDateString():"—"}</td><td className="row-actions"><button onClick={()=>setViewing(i)} title="View"><Eye size={16}/></button><button onClick={()=>openEdit(i)} title="Edit"><Pencil size={16}/></button><button onClick={()=>del(i.id)} title="Delete"><Trash2 size={16}/></button></td></tr>)}</tbody></table>}</div>
  </div>;
}
