import React from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

const initials = (name) => String(name).split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();

export default function Team() {
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"}/team`)
      .then(r => r.json())
      .then(result => setMembers(result.success ? result.data : []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return <main className="public-page"><div className="container">
    <SectionHeader kicker="OUR PEOPLE" title="The people behind DDA" text="DDA is led by volunteer professionals from Meki and surrounding communities who give their time, knowledge and skills." />
    {loading ? <div className="api-empty">Loading our team...</div> : members.length ? <div className="team-grid">
      {members.map(m => <article className="team-card" key={m.id}>
        {m.photoUrl
          ? <img className="team-photo" src={m.photoUrl} alt={m.name} />
          : <div className="team-photo team-photo-empty">{initials(m.name)}</div>}
        <h3>{m.name}</h3>
        <span className="team-role">{m.role}</span>
        {m.bio && <p>{m.bio}</p>}
      </article>)}
    </div> : <div className="api-empty">Our team page will be published soon.</div>}
    <div className="center-action"><Link className="btn btn-outline-blue" to="/get-involved">Join our volunteers</Link></div>
  </div></main>;
}
