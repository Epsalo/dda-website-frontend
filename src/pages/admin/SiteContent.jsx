import React from "react";
import { getSiteContent, updateSiteContent } from "../../api/siteContent.api";
import { useSiteContent } from "../../context/SiteContentContext";
import { getImageUrl, uploadImage } from "../../api/client";
import {
  Sparkles,
  UploadCloud,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  LayoutTemplate,
  Compass,
} from "lucide-react";

const IMAGE_GROUPS = [
  {
    title: "Homepage Hero & Brand Banners",
    description: "The primary high-impact visuals displayed prominently on the homepage and core landing sections.",
    icon: LayoutTemplate,
    items: [
      {
        key: "homeHeroImageUrl",
        label: "Homepage Hero Background",
        page: "/",
        pageName: "Home Page",
        defaultUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85",
        hint: "The large background photograph at the top of the homepage. Best size: 2000 x 1100px (16:9 landscape).",
        aspectRatio: "16:9",
      },
      {
        key: "aboutImageUrl",
        label: "Homepage 'Who We Are' Photo",
        page: "/#about",
        pageName: "Home Page (About)",
        defaultUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85",
        hint: "The featured photo next to the 'Local roots, Community action' story on the homepage.",
        aspectRatio: "4:3",
      },
      {
        key: "getInvolvedBgUrl",
        label: "'Get Involved' Section Background",
        page: "/#get-involved",
        pageName: "Home Page (Get Involved)",
        defaultUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2000&q=85",
        hint: "The background banner behind 'Be part of the change' section on the homepage.",
        aspectRatio: "21:9",
      },
    ],
  },
  {
    title: "Page Header & Key Section Photos",
    description: "Custom hero photos for the dedicated public subpages.",
    icon: Layers,
    items: [
      {
        key: "aboutPageImageUrl",
        label: "About Page Main Photo",
        page: "/about",
        pageName: "About Page",
        defaultUrl: "https://images.unsplash.com/photo-1509099836639-18ba02c7f2b4?auto=format&fit=crop&w=1200&q=85",
        hint: "The prominent photo on the dedicated About page showing DDA's mission in action.",
        aspectRatio: "4:3",
      },
      {
        key: "donateHeaderImageUrl",
        label: "Donate Page Header Banner",
        page: "/donate",
        pageName: "Donate Page",
        defaultUrl: "",
        hint: "Optional top background banner image displayed on the Donate page.",
        aspectRatio: "16:9",
      },
      {
        key: "programsHeaderImageUrl",
        label: "Programs Page Banner",
        page: "/programs",
        pageName: "Programs Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the Programs listing page.",
        aspectRatio: "16:9",
      },
      {
        key: "projectsHeaderImageUrl",
        label: "Projects Page Banner",
        page: "/projects",
        pageName: "Projects Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the Projects page.",
        aspectRatio: "16:9",
      },
      {
        key: "newsHeaderImageUrl",
        label: "News & Stories Page Banner",
        page: "/news",
        pageName: "News Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the News page.",
        aspectRatio: "16:9",
      },
      {
        key: "eventsHeaderImageUrl",
        label: "Events Page Banner",
        page: "/events",
        pageName: "Events Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the Events page.",
        aspectRatio: "16:9",
      },
      {
        key: "galleryHeaderImageUrl",
        label: "Community Gallery Banner",
        page: "/gallery",
        pageName: "Gallery Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the Gallery page.",
        aspectRatio: "16:9",
      },
      {
        key: "contactHeaderImageUrl",
        label: "Contact & Engagement Banner",
        page: "/contact",
        pageName: "Contact Page",
        defaultUrl: "",
        hint: "Optional banner displayed at the top of the Contact page.",
        aspectRatio: "16:9",
      },
    ],
  },
];

export default function SiteContentAdmin() {
  const { refresh } = useSiteContent();
  const [data, setData] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  React.useEffect(() => {
    getSiteContent()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const submit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const updated = await updateSiteContent(data);
      setData(updated);
      refresh();
      setMessage("Site images updated successfully! The public pages reflect the new photos immediately.");
    } catch (err) {
      setError(err.message || "Failed to update images");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = (key, defaultUrl) => {
    if (window.confirm("Reset this image to the default system photo?")) {
      handleImageChange(key, defaultUrl || "");
    }
  };

  const filteredGroups =
    activeTab === "all"
      ? IMAGE_GROUPS
      : IMAGE_GROUPS.filter((g, i) => (activeTab === "homepage" ? i === 0 : i === 1));

  return (
    <div className="admin-page-container">
      <div className="admin-page-title">
        <div>
          <span className="eyebrow">VISUAL CONTENT & ASSETS</span>
          <h1>Site Images & Media Manager</h1>
          <p>Easily customize, upload, and update major hero banners, section photos, and page headers across the DDA website.</p>
        </div>
      </div>

      {message && <div className="form-success admin-error">{message}</div>}
      {error && <div className="form-error admin-error">{error}</div>}

      <div className="media-manager-toolbar">
        <div className="media-tabs">
          <button
            type="button"
            className={`media-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <ImageIcon size={16} /> All Images
          </button>
          <button
            type="button"
            className={`media-tab ${activeTab === "homepage" ? "active" : ""}`}
            onClick={() => setActiveTab("homepage")}
          >
            <LayoutTemplate size={16} /> Homepage Banners
          </button>
          <button
            type="button"
            className={`media-tab ${activeTab === "pages" ? "active" : ""}`}
            onClick={() => setActiveTab("pages")}
          >
            <Compass size={16} /> Page Headers
          </button>
        </div>

        <button className="btn btn-primary" onClick={submit} disabled={saving || !data}>
          <Sparkles size={16} /> {saving ? "Saving Changes..." : "Save All Images"}
        </button>
      </div>

      {!data ? (
        <div className="table-empty">Loading visual assets...</div>
      ) : (
        <form onSubmit={submit} className="site-images-form">
          {filteredGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.title} className="image-group-section">
                <div className="image-group-header">
                  <div className="image-group-icon">
                    <GroupIcon size={20} />
                  </div>
                  <div>
                    <h2>{group.title}</h2>
                    <p>{group.description}</p>
                  </div>
                </div>

                <div className="image-cards-grid">
                  {group.items.map((item) => {
                    const currentValue = data[item.key] || "";
                    const previewUrl = currentValue ? getImageUrl(currentValue) : item.defaultUrl ? getImageUrl(item.defaultUrl) : "";
                    const isCustom = Boolean(currentValue && currentValue !== item.defaultUrl);

                    return (
                      <ImageManageCard
                        key={item.key}
                        item={item}
                        value={currentValue}
                        previewUrl={previewUrl}
                        isCustom={isCustom}
                        onChange={(val) => handleImageChange(item.key, val)}
                        onReset={() => handleReset(item.key, item.defaultUrl)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="settings-submit-bar">
            <button className="btn btn-primary btn-lg" disabled={saving}>
              {saving ? "Saving Changes..." : "Save All Images"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ImageManageCard({ item, value, previewUrl, isCustom, onChange, onReset }) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setUploadError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`image-manage-card ${isCustom ? "is-customized" : ""}`}>
      <div className="image-card-top">
        <div className="image-card-label-row">
          <h3>{item.label}</h3>
          <span className={`image-status-tag ${isCustom ? "status-custom" : "status-default"}`}>
            {isCustom ? "Custom Image" : "Default Photo"}
          </span>
        </div>
        <p className="image-card-hint">{item.hint}</p>
      </div>

      <div className="image-preview-box">
        {previewUrl ? (
          <img src={previewUrl} alt={item.label} className="image-preview-img" />
        ) : (
          <div className="image-preview-empty">
            <ImageIcon size={36} />
            <span>No image assigned (Default blank)</span>
          </div>
        )}
        <div className="image-preview-overlay">
          <span className="aspect-badge">{item.aspectRatio}</span>
          <a href={item.page} target="_blank" rel="noreferrer" className="preview-live-btn" title="View on live site">
            <ExternalLink size={13} /> {item.pageName}
          </a>
        </div>
      </div>

      <div className="image-card-controls">
        <div className="image-input-wrap">
          <input
            type="text"
            value={value}
            placeholder="Paste an image URL or click Upload below"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        {uploadError && <div className="form-error text-xs">{uploadError}</div>}

        <div className="image-btn-row">
          <label className="btn btn-outline-blue btn-upload-sm">
            <UploadCloud size={15} />
            {uploading ? "Uploading..." : "Upload New File"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              hidden
              disabled={uploading}
              onChange={handleFileUpload}
            />
          </label>

          {item.defaultUrl && (
            <button
              type="button"
              className="btn btn-ghost-sm"
              onClick={onReset}
              title="Revert to original default image"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}

          {value && (
            <button
              type="button"
              className="btn btn-ghost-sm text-danger"
              onClick={() => onChange("")}
              title="Clear custom image"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
