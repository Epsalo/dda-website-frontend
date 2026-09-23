import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw, Newspaper, Users, Mail, Activity } from "lucide-react";
import { getDashboardSummary } from "../../api/dashboard.api";

const cardMeta = [
  ["Programs", "programs", "/admin/programs"],
  ["Projects", "projects", "/admin/projects"],
  ["News", "news", "/admin/news"],
  ["Events", "events", "/admin/events"],
  ["Volunteers", "volunteers", "/admin/volunteers"],
  ["Partners", "partners", "/admin/partners"],
  ["Gallery", "gallery", "/admin/gallery"],
  ["Messages", "messages", "/admin/messages"],
];

const fmt = value => value ? new Date(value).toLocaleDateString() : "—";

export default function Dashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true); setError("");
    try { setData(await getDashboardSummary()); }
    catch (e) { setError(e.message || "Unable to load dashboard"); }
    finally { setLoading(false); }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const counts = data?.counts || {};
  return <>
    <div className="admin-page-title">
      <div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Monitor DDA website content and community engagement.</p></div>
      <button className="icon-btn" onClick={load} title="Refresh dashboard"><RefreshCw size={17}/></button>
    </div>
    {error && <div className="form-error admin-error">{error}</div>}

    <div className="dashboard-grid">
      {cardMeta.map(([name,key,to]) => <Link className="dashboard-card" to={to} key={key}>
        <span>{name}</span><strong>{loading ? "—" : counts[key] ?? 0}</strong><small>Manage <ArrowRight size={13}/></small>
      </Link>)}
    </div>

    <div className="dashboard-sections">
      <RecentPanel title="Recent news" icon={Newspaper} to="/admin/news" empty="No news has been created yet.">
        {data?.recent?.news?.map(x => <div className="recent-row" key={x.id}><div><strong>{x.title}</strong><small>{x.status} · {fmt(x.createdAt)}</small></div><span className={`status-pill status-${String(x.status).toLowerCase()}`}>{x.status}</span></div>)}
      </RecentPanel>
      <RecentPanel title="Volunteer applications" icon={Users} to="/admin/volunteers" empty="No volunteer applications yet.">
        {data?.recent?.volunteers?.map(x => <div className="recent-row" key={x.id}><div><strong>{x.fullName}</strong><small>{x.email} · {fmt(x.createdAt)}</small></div><span className="status-pill">{x.status}</span></div>)}
      </RecentPanel>
      <RecentPanel title="Contact messages" icon={Mail} to="/admin/messages" empty="No contact messages yet.">
        {data?.recent?.messages?.map(x => <div className="recent-row" key={x.id}><div><strong>{x.subject || "No subject"}</strong><small>From {x.name} · {fmt(x.createdAt)}</small></div><span className="status-pill">{x.status}</span></div>)}
      </RecentPanel>
    </div>

    <div className="admin-callout"><Activity size={20}/><div><h2>Content workflow</h2><p>Use the administration area to keep DDA's programs, projects, stories, events, gallery and community submissions up to date.</p></div></div>
  </>;
}

function RecentPanel({title,icon:Icon,to,empty,children}) {
  const has = React.Children.count(children) > 0;
  return <section className="recent-panel"><div className="recent-heading"><div><Icon size={18}/><h2>{title}</h2></div><Link to={to}>View all <ArrowRight size={14}/></Link></div>{has ? children : <div className="recent-empty">{empty}</div>}</section>;
}
