import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { getDonationSettings, updateDonationSettings } from "../../api/donations.api";
import { BANKS, WALLETS } from "../../data/donationMethods";

const normalize = d => ({
  internationalDonationUrl: d.internationalDonationUrl || "",
  bankAccounts: Array.isArray(d.bankAccounts) ? d.bankAccounts : [],
  walletAccounts: Array.isArray(d.walletAccounts) ? d.walletAccounts : [],
});

export default function DonationSettings() {
  const [data, setData] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    getDonationSettings().then(d => setData(normalize(d))).catch(e => setMessage(e.message));
  }, []);

  const submit = async e => {
    e.preventDefault();
    setSaving(true); setMessage("");
    try {
      setData(normalize(await updateDonationSettings(data)));
      setMessage("Donation settings saved. The donate page is updated.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateRow = (key, i, field, value) => setData(d => ({ ...d, [key]: d[key].map((row, idx) => idx === i ? { ...row, [field]: value } : row) }));
  const addRow = (key, row) => setData(d => ({ ...d, [key]: [...d[key], row] }));
  const removeRow = (key, i) => setData(d => ({ ...d, [key]: d[key].filter((_, idx) => idx !== i) }));

  return <div>
    <div className="admin-page-title"><div><span className="eyebrow">DONATIONS</span><h1>Donation settings</h1><p>These details appear on the public donate page. Add one row per bank or mobile-wallet account donors can transfer to.</p></div></div>
    {message && <div className="form-success admin-error">{message}</div>}
    {!data ? <div className="table-empty">Loading...</div> : <form className="admin-form donation-settings-form" onSubmit={submit}>
      <label>International donation link
        <input value={data.internationalDonationUrl} placeholder="e.g. GlobalGiving or GoFundMe project URL" onChange={e => setData({ ...data, internationalDonationUrl: e.target.value })}/>
      </label>

      <div className="settings-group">
        <h3>Bank accounts</h3>
        <div className="settings-rows">
          {data.bankAccounts.map((row, i) => <div className="settings-row bank-row" key={i}>
            <select value={row.id || ""} onChange={e => updateRow("bankAccounts", i, "id", e.target.value)}>
              <option value="" disabled>Select bank</option>
              {BANKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <input placeholder="Account name" value={row.accountName || ""} onChange={e => updateRow("bankAccounts", i, "accountName", e.target.value)}/>
            <input placeholder="Account number" value={row.accountNumber || ""} onChange={e => updateRow("bankAccounts", i, "accountNumber", e.target.value)}/>
            <input placeholder="Branch" value={row.branch || ""} onChange={e => updateRow("bankAccounts", i, "branch", e.target.value)}/>
            <button type="button" className="row-remove" onClick={() => removeRow("bankAccounts", i)} aria-label="Remove bank account"><Trash2 size={16}/></button>
          </div>)}
        </div>
        <button type="button" className="settings-add" onClick={() => addRow("bankAccounts", { id: "", accountName: "", accountNumber: "", branch: "" })}><Plus size={15}/> Add bank account</button>
      </div>

      <div className="settings-group">
        <h3>Mobile wallet accounts</h3>
        <div className="settings-rows">
          {data.walletAccounts.map((row, i) => <div className="settings-row wallet-row" key={i}>
            <select value={row.id || ""} onChange={e => updateRow("walletAccounts", i, "id", e.target.value)}>
              <option value="" disabled>Select wallet</option>
              {WALLETS.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <input placeholder="Registered account name" value={row.accountName || ""} onChange={e => updateRow("walletAccounts", i, "accountName", e.target.value)}/>
            <input placeholder="Wallet number / phone" value={row.number || ""} onChange={e => updateRow("walletAccounts", i, "number", e.target.value)}/>
            <button type="button" className="row-remove" onClick={() => removeRow("walletAccounts", i)} aria-label="Remove wallet account"><Trash2 size={16}/></button>
          </div>)}
        </div>
        <button type="button" className="settings-add" onClick={() => addRow("walletAccounts", { id: "", accountName: "", number: "" })}><Plus size={15}/> Add wallet account</button>
      </div>

      <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save settings"}</button>
    </form>}
  </div>;
}
