import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  RefreshCw,
  Newspaper,
  Users,
  Mail,
  HeartHandshake,
  FolderKanban,
  CalendarDays,
  Images,
  Handshake,
  CircleUserRound,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Plus,
  ExternalLink,
  ShieldCheck,
  Building2,
  PhoneCall,
  Activity,
} from "lucide-react";
import { getDashboardSummary } from "../../api/dashboard.api";
import { useAuth } from "../../context/AuthContext";

const fmt = (value) => (value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—");
const fmtMoney = (val) => Number(val || 0).toLocaleString() + " ETB";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const summary = await getDashboardSummary();
      setData(summary);
    } catch (e) {
      setError(e.message || "Unable to load dashboard summary");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const counts = data?.counts || {};
  const recent = data?.recent || {};

  return (
    <div className="admin-dashboard-root">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-text-side">
          <div className="welcome-eyebrow">
            <span className="live-dot" /> SYSTEM ACTIVE • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </div>
          <h1>
            Welcome back, <span>{user?.name || "Administrator"}</span> 👋
          </h1>
          <p>Here is a live overview of Dembel Development Alliance programs, stories, volunteer applications, and donations.</p>
        </div>

        <div className="welcome-actions">
          <button className="icon-btn" onClick={load} title="Refresh Live Data" disabled={loading}>
            <RefreshCw size={17} className={loading ? "spin" : ""} />
          </button>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-white">
            <ExternalLink size={15} /> View Live Website
          </a>
        </div>
      </div>

      {error && <div className="form-error admin-error">{error}</div>}

      {/* Quick Action Shortcuts */}
      <div className="quick-actions-bar">
        <span className="quick-actions-title">Quick Actions:</span>
        <div className="quick-actions-list">
          <Link to="/admin/projects" className="quick-action-chip">
            <Plus size={14} /> Add Project
          </Link>
          <Link to="/admin/news" className="quick-action-chip">
            <Plus size={14} /> Write Story
          </Link>
          <Link to="/admin/gallery" className="quick-action-chip">
            <Plus size={14} /> Upload Gallery Photo
          </Link>
          <Link to="/admin/site-content" className="quick-action-chip highlight-chip">
            <ImageIcon size={14} /> Manage Site Images
          </Link>
          <Link to="/admin/donations/settings" className="quick-action-chip">
            <Building2 size={14} /> Donation Accounts
          </Link>
        </div>
      </div>

      {/* Primary Stat Cards */}
      <div className="dashboard-stats-grid">
        <StatCard
          icon={FolderKanban}
          title="Projects"
          count={counts.projects}
          subtext={`${counts.activeProjects || 0} active/ongoing`}
          to="/admin/projects"
          color="#1f3f8f"
          loading={loading}
        />
        <StatCard
          icon={Newspaper}
          title="News & Stories"
          count={counts.news}
          subtext={`${counts.publishedNews || 0} published`}
          to="/admin/news"
          color="#0d766e"
          loading={loading}
        />
        <StatCard
          icon={HeartHandshake}
          title="Donations Raised"
          count={counts.donationsTotal ? fmtMoney(counts.donationsTotal) : "0 ETB"}
          subtext={`${counts.donations || 0} total contributions`}
          to="/admin/donations"
          color="#e87722"
          loading={loading}
          isLargeText
        />
        <StatCard
          icon={Users}
          title="Volunteers"
          count={counts.volunteers}
          subtext={counts.newVolunteers ? `${counts.newVolunteers} new applications` : "All reviewed"}
          to="/admin/volunteers"
          color="#6a2c91"
          badge={counts.newVolunteers > 0 ? `${counts.newVolunteers} New` : null}
          loading={loading}
        />
        <StatCard
          icon={Mail}
          title="Contact Inquiries"
          count={counts.messages}
          subtext={counts.newMessages ? `${counts.newMessages} unread messages` : "Inbox clear"}
          to="/admin/messages"
          color="#b91c1c"
          badge={counts.newMessages > 0 ? `${counts.newMessages} Unread` : null}
          loading={loading}
        />
        <StatCard
          icon={Images}
          title="Gallery Photos"
          count={counts.gallery}
          subtext="Community moments"
          to="/admin/gallery"
          color="#0369a1"
          loading={loading}
        />
        <StatCard
          icon={CalendarDays}
          title="Events"
          count={counts.events}
          subtext="Community engagements"
          to="/admin/events"
          color="#4338ca"
          loading={loading}
        />
        <StatCard
          icon={CircleUserRound}
          title="Team & Board"
          count={counts.team}
          subtext="Leadership profiles"
          to="/admin/team"
          color="#15803d"
          loading={loading}
        />
      </div>

      {/* Main Activity Hub */}
      <div className="dashboard-activity-hub">
        {/* Left Column: Messages & Volunteers */}
        <div className="activity-column">
          <section className="activity-panel">
            <div className="activity-panel-header">
              <div className="panel-title-wrap">
                <Mail size={18} className="panel-icon icon-mail" />
                <h2>Recent Contact Messages</h2>
              </div>
              <Link to="/admin/messages" className="panel-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="activity-panel-body">
              {recent?.messages?.length ? (
                recent.messages.map((m) => (
                  <div key={m.id} className="activity-row">
                    <div className="activity-main">
                      <strong>{m.subject || "General Inquiry"}</strong>
                      <span className="activity-sub">
                        From <b>{m.name}</b> · {m.email}
                      </span>
                    </div>
                    <div className="activity-right">
                      <span className={`status-pill status-${String(m.status).toLowerCase()}`}>
                        {m.status}
                      </span>
                      <small className="activity-time">{fmt(m.createdAt)}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-empty">No contact submissions received yet.</div>
              )}
            </div>
          </section>

          <section className="activity-panel">
            <div className="activity-panel-header">
              <div className="panel-title-wrap">
                <Users size={18} className="panel-icon icon-users" />
                <h2>Volunteer Applications</h2>
              </div>
              <Link to="/admin/volunteers" className="panel-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="activity-panel-body">
              {recent?.volunteers?.length ? (
                recent.volunteers.map((v) => (
                  <div key={v.id} className="activity-row">
                    <div className="activity-main">
                      <strong>{v.fullName}</strong>
                      <span className="activity-sub">
                        {v.city ? `${v.city} · ` : ""}
                        {v.interest || "General Support"}
                      </span>
                    </div>
                    <div className="activity-right">
                      <span className={`status-pill status-${String(v.status).toLowerCase()}`}>
                        {v.status}
                      </span>
                      <small className="activity-time">{fmt(v.createdAt)}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-empty">No volunteer applications yet.</div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: News & Donations */}
        <div className="activity-column">
          <section className="activity-panel">
            <div className="activity-panel-header">
              <div className="panel-title-wrap">
                <HeartHandshake size={18} className="panel-icon icon-donate" />
                <h2>Latest Donations</h2>
              </div>
              <Link to="/admin/donations" className="panel-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="activity-panel-body">
              {recent?.donations?.length ? (
                recent.donations.map((d) => (
                  <div key={d.id} className="activity-row">
                    <div className="activity-main">
                      <strong>{d.donorName || "Anonymous Donor"}</strong>
                      <span className="activity-sub">
                        Method: {d.method || "Transfer"}
                      </span>
                    </div>
                    <div className="activity-right">
                      <strong className="donation-amount">
                        {Number(d.amount).toLocaleString()} {d.currency || "ETB"}
                      </strong>
                      <span className={`status-pill status-${String(d.status).toLowerCase()}`}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-empty">No donation records found.</div>
              )}
            </div>
          </section>

          <section className="activity-panel">
            <div className="activity-panel-header">
              <div className="panel-title-wrap">
                <Newspaper size={18} className="panel-icon icon-news" />
                <h2>Recent News & Stories</h2>
              </div>
              <Link to="/admin/news" className="panel-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="activity-panel-body">
              {recent?.news?.length ? (
                recent.news.map((n) => (
                  <div key={n.id} className="activity-row">
                    <div className="activity-main">
                      <strong>{n.title}</strong>
                      <span className="activity-sub">{fmt(n.createdAt)}</span>
                    </div>
                    <div className="activity-right">
                      <span className={`status-pill status-${String(n.status).toLowerCase()}`}>
                        {n.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-empty">No news published yet.</div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* System Status Callout Banner */}
      <div className="admin-status-banner">
        <div className="status-banner-content">
          <div className="status-badge-icon">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h3>DDA Platform Operating Reliably</h3>
            <p>
              Your database is connected, secure proxy headers are active, and media uploads are resolved dynamically across Netlify and Render.
            </p>
          </div>
        </div>
        <div className="status-banner-links">
          <Link to="/admin/site-content" className="btn btn-primary btn-sm">
            <ImageIcon size={15} /> Customize Site Images
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, count, subtext, to, color, badge, loading, isLargeText }) {
  return (
    <Link to={to} className="dash-stat-card">
      <div className="stat-card-header">
        <div className="stat-icon-box" style={{ background: `${color}14`, color: color }}>
          <Icon size={20} />
        </div>
        {badge && <span className="stat-badge">{badge}</span>}
      </div>
      <div className="stat-card-body">
        <span className="stat-label">{title}</span>
        <strong className={`stat-number ${isLargeText ? "stat-number-compact" : ""}`}>
          {loading ? "—" : count ?? 0}
        </strong>
        <small className="stat-subtext">
          {subtext} <ArrowRight size={12} />
        </small>
      </div>
    </Link>
  );
}
