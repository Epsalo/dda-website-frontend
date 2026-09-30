import React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Building2, Smartphone, Globe2, Sparkles, CheckCircle2, Copy } from "lucide-react";
import { getDonationSettings, updateDonationSettings } from "../../api/donations.api";
import { BANKS, WALLETS } from "../../data/donationMethods";
import ImageField from "../../components/ImageField";
import { getImageUrl } from "../../api/client";

const normalize = (d) => ({
  internationalDonationUrl: d?.internationalDonationUrl || "",
  bankAccounts: Array.isArray(d?.bankAccounts) ? d.bankAccounts : [],
  walletAccounts: Array.isArray(d?.walletAccounts) ? d.walletAccounts : [],
});

export default function DonationSettings() {
  const [data, setData] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    getDonationSettings()
      .then((d) => setData(normalize(d)))
      .catch((e) => setError(e.message));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const saved = await updateDonationSettings(data);
      setData(normalize(saved));
      setMessage("Donation accounts and settings updated successfully! Public donate page has been updated.");
    } catch (err) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateRow = (listKey, index, field, value) => {
    setData((prev) => ({
      ...prev,
      [listKey]: prev[listKey].map((row, i) => {
        if (i !== index) return row;
        const updated = { ...row, [field]: value };
        // If selecting a preset bank or wallet, autofill default metadata if not custom
        if (field === "id") {
          if (value === "custom") {
            updated.isCustom = true;
            if (!updated.name) updated.name = "Custom Institution";
          } else {
            const catalog = listKey === "bankAccounts" ? BANKS : WALLETS;
            const preset = catalog.find((c) => c.id === value);
            if (preset) {
              updated.isCustom = false;
              updated.name = preset.name;
              updated.short = preset.short || "";
              updated.color = preset.color || "#1f3f8f";
              updated.logo = preset.logo || "";
            }
          }
        }
        return updated;
      }),
    }));
  };

  const addBank = () => {
    setData((prev) => ({
      ...prev,
      bankAccounts: [
        ...prev.bankAccounts,
        {
          id: "custom",
          isCustom: true,
          name: "",
          short: "",
          color: "#1f3f8f",
          logo: "",
          accountName: "Dembel Development Alliance",
          accountNumber: "",
          branch: "",
        },
      ],
    }));
  };

  const addWallet = () => {
    setData((prev) => ({
      ...prev,
      walletAccounts: [
        ...prev.walletAccounts,
        {
          id: "custom",
          isCustom: true,
          name: "",
          short: "",
          color: "#0083c9",
          logo: "",
          accountName: "Dembel Development Alliance",
          number: "",
        },
      ],
    }));
  };

  const moveRow = (listKey, index, direction) => {
    setData((prev) => {
      const list = [...prev[listKey]];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return { ...prev, [listKey]: list };
    });
  };

  const removeRow = (listKey, index) => {
    if (!window.confirm("Remove this payment account from the public donate page?")) return;
    setData((prev) => ({
      ...prev,
      [listKey]: prev[listKey].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-title">
        <div>
          <span className="eyebrow">DONATION SYSTEM</span>
          <h1>Donation & Transfer Accounts</h1>
          <p>Configure bank transfer accounts, mobile wallets, and international fundraising links displayed on the public donate page.</p>
        </div>
      </div>

      {message && <div className="form-success admin-error">{message}</div>}
      {error && <div className="form-error admin-error">{error}</div>}

      {!data ? (
        <div className="table-empty">Loading donation settings...</div>
      ) : (
        <form className="admin-settings-form" onSubmit={submit}>
          {/* International Donors Card */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Globe2 size={22} className="card-icon-globe" />
              <div>
                <h2>International Donor Platform</h2>
                <p>Link to your verified GoFundMe, GlobalGiving, or external crowdfunding page for diaspora supporters.</p>
              </div>
            </div>
            <div className="settings-card-body">
              <label className="field-group">
                <span>International Donation URL</span>
                <input
                  type="url"
                  value={data.internationalDonationUrl}
                  placeholder="https://www.globalgiving.org/projects/..."
                  onChange={(e) => setData({ ...data, internationalDonationUrl: e.target.value })}
                />
                <small className="field-hint">Leave blank if international giving is not currently active.</small>
              </label>
            </div>
          </div>

          {/* Bank Accounts Section */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Building2 size={22} className="card-icon-bank" />
              <div className="card-header-flex">
                <div>
                  <h2>Bank Transfer Accounts</h2>
                  <p>Supporters can transfer directly from any Ethiopian bank. Choose from standard banks or add custom institutions.</p>
                </div>
                <button type="button" className="btn btn-outline-blue btn-sm" onClick={addBank}>
                  <Plus size={15} /> Add Bank Account
                </button>
              </div>
            </div>

            <div className="settings-card-body">
              {!data.bankAccounts.length ? (
                <div className="settings-empty-state">
                  <Building2 size={32} />
                  <p>No bank accounts configured yet.</p>
                  <button type="button" className="btn btn-primary btn-sm" onClick={addBank}>
                    <Plus size={15} /> Add First Bank Account
                  </button>
                </div>
              ) : (
                <div className="account-cards-list">
                  {data.bankAccounts.map((acc, index) => (
                    <div key={index} className={`account-item-card ${acc.isCustom ? "is-custom-account" : ""}`}>
                      <div className="account-item-topbar">
                        <div className="account-type-badge">
                          <Building2 size={16} />
                          <strong>Bank #{index + 1}</strong>
                          {acc.isCustom && <span className="custom-tag">Custom</span>}
                        </div>
                        <div className="account-actions">
                          <button
                            type="button"
                            className="order-btn"
                            disabled={index === 0}
                            onClick={() => moveRow("bankAccounts", index, -1)}
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            className="order-btn"
                            disabled={index === data.bankAccounts.length - 1}
                            onClick={() => moveRow("bankAccounts", index, 1)}
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            className="delete-item-btn"
                            onClick={() => removeRow("bankAccounts", index)}
                            title="Remove Account"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="account-form-grid">
                        <label className="field-group">
                          <span>Bank Institution</span>
                          <select
                            value={acc.isCustom ? "custom" : acc.id || "custom"}
                            onChange={(e) => updateRow("bankAccounts", index, "id", e.target.value)}
                          >
                            <option value="custom">✨ + Custom / Other Bank...</option>
                            <optgroup label="Preset Ethiopian Banks">
                              {BANKS.map((b) => (
                                <option key={b.id} value={b.id}>
                                  {b.name} ({b.short})
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </label>

                        {acc.isCustom && (
                          <>
                            <label className="field-group">
                              <span>Custom Bank Name *</span>
                              <input
                                required
                                value={acc.name || ""}
                                placeholder="e.g. Siinqee Bank, Enat Bank"
                                onChange={(e) => updateRow("bankAccounts", index, "name", e.target.value)}
                              />
                            </label>
                            <label className="field-group">
                              <span>Short Code / Abbreviation</span>
                              <input
                                value={acc.short || ""}
                                placeholder="e.g. SB, EB"
                                onChange={(e) => updateRow("bankAccounts", index, "short", e.target.value)}
                              />
                            </label>
                          </>
                        )}

                        <label className="field-group">
                          <span>Account Name / Beneficiary *</span>
                          <input
                            required
                            value={acc.accountName || ""}
                            placeholder="e.g. Dembel Development Alliance"
                            onChange={(e) => updateRow("bankAccounts", index, "accountName", e.target.value)}
                          />
                        </label>

                        <label className="field-group">
                          <span>Account Number *</span>
                          <input
                            required
                            className="font-mono"
                            value={acc.accountNumber || ""}
                            placeholder="e.g. 1000123456789"
                            onChange={(e) => updateRow("bankAccounts", index, "accountNumber", e.target.value)}
                          />
                        </label>

                        <label className="field-group">
                          <span>Branch (Optional)</span>
                          <input
                            value={acc.branch || ""}
                            placeholder="e.g. Meki Main Branch"
                            onChange={(e) => updateRow("bankAccounts", index, "branch", e.target.value)}
                          />
                        </label>

                        {acc.isCustom && (
                          <div className="field-group custom-image-field-wrap">
                            <ImageField
                              label="Custom Bank Logo (Optional)"
                              value={acc.logo || ""}
                              onChange={(v) => updateRow("bankAccounts", index, "logo", v)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Wallets Section */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Smartphone size={22} className="card-icon-wallet" />
              <div className="card-header-flex">
                <div>
                  <h2>Mobile Money & Wallets</h2>
                  <p>Telebirr, CBE Birr, M-Pesa, Coopay-Ebirr, or any custom mobile wallet/paybill account.</p>
                </div>
                <button type="button" className="btn btn-outline-blue btn-sm" onClick={addWallet}>
                  <Plus size={15} /> Add Wallet Account
                </button>
              </div>
            </div>

            <div className="settings-card-body">
              {!data.walletAccounts.length ? (
                <div className="settings-empty-state">
                  <Smartphone size={32} />
                  <p>No mobile wallets configured yet.</p>
                  <button type="button" className="btn btn-primary btn-sm" onClick={addWallet}>
                    <Plus size={15} /> Add First Wallet
                  </button>
                </div>
              ) : (
                <div className="account-cards-list">
                  {data.walletAccounts.map((acc, index) => (
                    <div key={index} className={`account-item-card ${acc.isCustom ? "is-custom-account" : ""}`}>
                      <div className="account-item-topbar">
                        <div className="account-type-badge">
                          <Smartphone size={16} />
                          <strong>Wallet #{index + 1}</strong>
                          {acc.isCustom && <span className="custom-tag">Custom</span>}
                        </div>
                        <div className="account-actions">
                          <button
                            type="button"
                            className="order-btn"
                            disabled={index === 0}
                            onClick={() => moveRow("walletAccounts", index, -1)}
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            className="order-btn"
                            disabled={index === data.walletAccounts.length - 1}
                            onClick={() => moveRow("walletAccounts", index, 1)}
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            className="delete-item-btn"
                            onClick={() => removeRow("walletAccounts", index)}
                            title="Remove Wallet"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="account-form-grid">
                        <label className="field-group">
                          <span>Wallet Provider</span>
                          <select
                            value={acc.isCustom ? "custom" : acc.id || "custom"}
                            onChange={(e) => updateRow("walletAccounts", index, "id", e.target.value)}
                          >
                            <option value="custom">✨ + Custom / Other Wallet...</option>
                            <optgroup label="Preset Mobile Wallets">
                              {WALLETS.map((w) => (
                                <option key={w.id} value={w.id}>
                                  {w.name}
                                </option>
                              ))}
                            </optgroup>
                          </select>
                        </label>

                        {acc.isCustom && (
                          <label className="field-group">
                            <span>Custom Wallet Name *</span>
                            <input
                              required
                              value={acc.name || ""}
                              placeholder="e.g. AwashBirr, HelloCash"
                              onChange={(e) => updateRow("walletAccounts", index, "name", e.target.value)}
                            />
                          </label>
                        )}

                        <label className="field-group">
                          <span>Registered Name *</span>
                          <input
                            required
                            value={acc.accountName || ""}
                            placeholder="e.g. Dembel Development Alliance"
                            onChange={(e) => updateRow("walletAccounts", index, "accountName", e.target.value)}
                          />
                        </label>

                        <label className="field-group">
                          <span>Wallet Number / Phone / Till *</span>
                          <input
                            required
                            className="font-mono"
                            value={acc.number || ""}
                            placeholder="e.g. 0911223344 or Paybill number"
                            onChange={(e) => updateRow("walletAccounts", index, "number", e.target.value)}
                          />
                        </label>

                        {acc.isCustom && (
                          <div className="field-group custom-image-field-wrap">
                            <ImageField
                              label="Custom Wallet Logo (Optional)"
                              value={acc.logo || ""}
                              onChange={(v) => updateRow("walletAccounts", index, "logo", v)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="settings-submit-bar">
            <button className="btn btn-primary btn-lg" disabled={saving}>
              {saving ? "Saving Changes..." : "Save Donation Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
