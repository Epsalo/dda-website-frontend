import React from "react";
import { getSiteContent, updateSiteContent } from "../../api/siteContent.api";
import { useSiteContent } from "../../context/SiteContentContext";
import ImageField from "../../components/ImageField";

const FIELDS = [
  ["homeHeroImageUrl", "Homepage hero background", "The large photo behind the headline at the top of the home page. Recommended width: 2000px or more."],
  ["aboutImageUrl", "About section image (home page)", "The photo in the 'Who we are' section of the home page — use a real photo showing DDA's work in the community."],
  ["aboutPageImageUrl", "About page photo", "The main photo on the About page."],
  ["getInvolvedBgUrl", "Get Involved section background", "The background image behind the 'Be part of the change' section."],
];

export default function SiteContentAdmin() {
  const { refresh } = useSiteContent();
  const [data, setData] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    getSiteContent().then(setData).catch(e => setMessage(e.message));
  }, []);

  const submit = async e => {
    e.preventDefault();
    setSaving(true); setMessage("");
    try {
      setData(await updateSiteContent(data));
      refresh();
      setMessage("Site images saved. The public pages are updated.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  return <div>
    <div className="admin-page-title"><div><span className="eyebrow">SITE CONTENT</span><h1>Site images</h1><p>Replace the default photos used across the public site with real images of DDA's work. Leave a field empty to keep the current default photo.</p></div></div>
    {message && <div className="form-success admin-error">{message}</div>}
    {!data ? <div className="table-empty">Loading...</div> : <form className="admin-form" onSubmit={submit}>
      {FIELDS.map(([key, label, hint]) => <div key={key} className="site-content-field">
        <ImageField label={label} value={data[key] || ""} onChange={v => setData({ ...data, [key]: v })}/>
        <small className="field-hint">{hint}</small>
      </div>)}
      <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save images"}</button>
    </form>}
  </div>;
}
