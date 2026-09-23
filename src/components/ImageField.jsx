import React from "react";
import { UploadCloud } from "lucide-react";
import { uploadImage } from "../api/client";

export default function ImageField({ label, value, onChange, required }) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState("");
  const pick = async e => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true); setError("");
    try { onChange(await uploadImage(file)); }
    catch (err) { setError(err.message); }
    finally { setUploading(false); }
  };
  return <label className="image-upload-field">
    <span>{label}{required ? " *" : ""}</span>
    <div className="image-upload-row">
      {value ? <img className="image-upload-preview" src={value} alt="Preview" /> : <div className="image-upload-preview image-upload-empty"><UploadCloud size={22} /></div>}
      <div className="image-upload-controls">
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Paste an image URL or upload a file" required={required && !value} />
        <label className="btn btn-outline-blue btn-upload">
          <UploadCloud size={16} />{uploading ? "Uploading..." : "Upload"}
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={pick} disabled={uploading} />
        </label>
        {value && <button type="button" className="image-upload-clear" onClick={() => onChange("")}>Clear</button>}
      </div>
    </div>
    {error && <small className="form-error">{error}</small>}
  </label>;
}
