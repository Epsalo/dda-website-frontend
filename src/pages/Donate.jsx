import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Banknote, Globe2, Copy, CheckCircle2, XCircle, Hourglass, HeartHandshake, Smartphone } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { initializeDonation, getDonationConfig, getDonationSettings, verifyDonation } from "../api/donations.api";
import { BANKS, WALLETS } from "../data/donationMethods";
import { getImageUrl } from "../api/client";

const PRESETS = [100, 250, 500, 1000, 2500, 5000];

const PAYMENT_METHODS = [
  { name: "Telebirr", src: "/payments/telebirr.png" },
  { name: "CBE Birr", src: "/payments/cbe-birr.jpg" },
  { name: "M-Pesa", src: "/payments/mpesa.webp" },
  { name: "Coopay-Ebirr", src: "/payments/coopay-ebirr.png" },
];

export function Donate() {
  const [config, setConfig] = React.useState({ chapaEnabled: false });
  const [settings, setSettings] = React.useState(null);
  const [amount, setAmount] = React.useState("");
  const [form, setForm] = React.useState({ donorName: "", email: "", phone: "", message: "" });
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    getDonationConfig().then(setConfig).catch(() => {});
    getDonationSettings().then(setSettings).catch(() => setSettings({}));
  }, []);

  const payOnline = async e => {
    e.preventDefault();
    setState({ busy: true });
    try {
      const result = await initializeDonation({ ...form, amount: Number(amount) });
      if (result?.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
        return;
      }
      setState({ error: "Payment could not be started. Please try the bank transfer option." });
    } catch (err) {
      setState({ error: err.message });
    }
  };

  return <main className="public-page donate-page"><div className="container">
    <SectionHeader kicker="SUPPORT DDA" title="Invest in stronger communities." text="Every contribution helps Dembel Development Alliance deliver education, clean water, health and opportunity programs in Meki and surrounding communities." />

    <div className="donate-grid">
      <section className="donate-panel">
        <h2><HeartHandshake size={20}/> Make a donation</h2>
        {config.chapaEnabled ? <>
          <p className="donate-currency-note">All amounts in Ethiopian Birr (ETB).</p>
          <div className="amount-presets">
            {PRESETS.map(p => <button type="button" key={p} className={`amount-chip${Number(amount) === p ? " selected" : ""}`} onClick={() => setAmount(String(p))}>{p.toLocaleString()} ETB</button>)}
          </div>
          <form className="public-form" onSubmit={payOnline}>
            <label>Amount (ETB)<input type="number" min="1" required value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter a custom amount"/></label>
            <div className="form-two">
              <label>Your name<input required value={form.donorName} onChange={e => setForm({ ...form, donorName: e.target.value })}/></label>
              <label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/></label>
            </div>
            <label>Phone (for mobile money)<input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/></label>
            <label>Message or dedication (optional)<textarea rows="3" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/></label>

            {state.error && <div className="form-error">{state.error}</div>}

            <button className="btn btn-primary btn-full" disabled={state.busy}>{state.busy ? "Starting payment..." : "Pay securely with Chapa"}</button>
          </form>

          <div className="payment-methods">
            <p className="payment-methods-label">Pay with your preferred channel:</p>
            <div className="payment-chips">
              {PAYMENT_METHODS.map(m => <img key={m.name} src={m.src} alt={m.name} title={m.name}/>)}
            </div>
          </div>
        </> : <MethodChooser settings={settings}/>}
      </section>

      {settings?.internationalDonationUrl && <aside className="donate-side">
        <section className="donate-panel international-panel">
          <h2><Globe2 size={20}/> International donors</h2>
          <p>Supporters abroad can give safely through our international fundraising page.</p>
          <a className="btn btn-outline-blue" href={settings.internationalDonationUrl} target="_blank" rel="noreferrer">Donate via international platform</a>
        </section>
      </aside>}
    </div>
  </div></main>;
}

export function DonateReturn() {
  const [params] = useSearchParams();
  const txRef = params.get("tx_ref");
  const [status, setStatus] = React.useState("loading");
  const [donation, setDonation] = React.useState(null);

  React.useEffect(() => {
    if (!txRef) { setStatus("missing"); return; }
    let active = true;
    let timer = null;
    let attempts = 0;
    const verify = () => {
      attempts += 1;
      verifyDonation(txRef)
        .then(result => {
          if (!active) return;
          if (result.success) {
            const nextStatus = String(result.data.status).toLowerCase();
            setDonation(result.data);
            setStatus(nextStatus);
            if (nextStatus === "pending" && attempts < 75) timer = setTimeout(verify, 4000);
          } else setStatus("missing");
        })
        .catch(() => {
          if (!active) return;
          if (attempts < 4) timer = setTimeout(verify, 4000);
          else setStatus("error");
        });
    };
    verify();
    return () => { active = false; clearTimeout(timer); };
  }, [txRef]);

  const icons = { success: <CheckCircle2 size={44}/>, failed: <XCircle size={44}/>, pending: <Hourglass size={44}/> };
  const messages = {
    success: ["Thank you for your donation!", "Your payment has been confirmed. A receipt has been sent to your email if provided. Your generosity helps build stronger communities in Meki."],
    pending: ["Payment is being processed", "We have received your donation request and it is still processing. This page updates automatically once your payment provider settles it — you can also refresh to check again."],
    failed: ["Payment was not completed", "Unfortunately the payment did not go through. No money has been taken. You can try again, or use the bank transfer option on the donation page."],
    missing: ["Donation not found", "We could not find a donation for this payment reference. If you believe this is a mistake, please contact us."],
    error: ["Something went wrong", "We could not verify your payment right now. Please try again in a moment or contact us with your payment reference."],
    loading: ["Checking your payment...", ""],
  };
  const [title, text] = messages[status] || messages.error;

  return <main className="public-page"><div className="container donate-return">
    <div className={`donate-return-card return-${status}`}>
      {status === "loading" ? <div className="spinner"/> : icons[status] || icons.error}
      <h1>{title}</h1>
      <p>{text}</p>
      {donation && <p className="donate-ref">Reference: <strong>{donation.txRef}</strong> · Amount: <strong>{donation.amount} {donation.currency}</strong></p>}
      <div className="contact-buttons">
        <Link className="btn btn-primary" to="/">Back to home</Link>
        <Link className="btn btn-outline-blue" to="/donate">Donation page</Link>
      </div>
    </div>
  </div></main>;
}

function useCopyText() {
  const [copied, setCopied] = React.useState("");
  const copy = async text => {
    try { await navigator.clipboard.writeText(text); setCopied(text); setTimeout(() => setCopied(""), 2000); } catch { /* clipboard unavailable */ }
  };
  return [copied, copy];
}

function MethodLogo({ item }) {
  const [err, setErr] = React.useState(false);
  const resolvedLogo = item.logo ? getImageUrl(item.logo) : "";
  if (!resolvedLogo || err) {
    const initials = item.short || (item.name || "").split(/\s+/).map(w => w[0]).join("").slice(0, 3).toUpperCase();
    return <span className="method-mono" style={{ background: item.color || "#1f3f8f" }}>{initials}</span>;
  }
  return <img src={resolvedLogo} alt={item.name} onError={() => setErr(true)}/>;
}

export function MethodChooser({ settings }) {
  const [method, setMethod] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [copied, copy] = useCopyText();

  const accounts = (method === "bank" ? settings?.bankAccounts : settings?.walletAccounts) || [];
  const presets = method === "bank" ? BANKS : WALLETS;

  const displayItems = React.useMemo(() => {
    if (accounts.length > 0) {
      return accounts.map((acc, idx) => {
        const preset = presets.find(p => p.id === acc.id);
        const name = acc.name || preset?.name || acc.bank || acc.wallet || `Account #${idx + 1}`;
        const key = acc.id === "custom" || !acc.id ? `custom-${idx}` : (acc.id || `acc-${idx}`);
        return {
          id: key,
          originalId: acc.id,
          name,
          short: acc.short || preset?.short || name.slice(0, 3).toUpperCase(),
          color: acc.color || preset?.color || "#1f3f8f",
          logo: acc.logo || preset?.logo || "",
          account: acc,
        };
      });
    }
    return presets.map(p => ({
      id: p.id,
      originalId: p.id,
      name: p.name,
      short: p.short,
      color: p.color,
      logo: p.logo,
      account: null,
    }));
  }, [accounts, presets]);

  React.useEffect(() => {
    if (method && displayItems.length > 0) {
      if (!selected || !displayItems.some(i => i.id === selected)) {
        setSelected(displayItems[0].id);
      }
    }
  }, [method, displayItems, selected]);

  const activeItem = displayItems.find(c => c.id === selected) || displayItems[0];
  const acc = activeItem?.account || accounts.find(a => a.id === selected || (a.bank || a.wallet || "").toLowerCase() === activeItem?.name?.toLowerCase());
  const number = acc ? (acc.accountNumber || acc.number || "") : "";
  const hasDetails = Boolean(number);

  return <div className="method-chooser">
    <p className="donate-online-soon chooser-note"><strong>Direct Giving:</strong> Choose your preferred bank or mobile money channel below to transfer your contribution securely.</p>

    {!method && <div className="method-cards">
      <button type="button" className="method-card" onClick={() => { setMethod("bank"); setSelected(null); }}>
        <Banknote size={28}/><span>Donate by bank</span><small>Commercial Bank, Awash, Dashen, Siinqee & other banks</small>
      </button>
      <button type="button" className="method-card" onClick={() => { setMethod("wallet"); setSelected(null); }}>
        <Smartphone size={28}/><span>Donate by wallet</span><small>Telebirr, CBE Birr, M-Pesa, Coopay-Ebirr</small>
      </button>
    </div>}

    {method && <div className="method-body">
      <button type="button" className="chooser-back" onClick={() => { setMethod(null); setSelected(null); }}>← Change method</button>
      <div className="method-grid">
        {displayItems.map(c => <button key={c.id} type="button" className={`method-tile${selected === c.id ? " selected" : ""}`} onClick={() => setSelected(c.id)}>
          <MethodLogo item={c}/><span>{c.name}</span>
        </button>)}
      </div>

      {activeItem && <div className="method-details">
        <h3>{activeItem.name}</h3>
        {hasDetails ? <dl className="bank-details">
          <div><dt>Account name</dt><dd>{acc.accountName || "Dembel Development Alliance"}</dd></div>
          <div><dt>{method === "bank" ? "Account number" : "Wallet / Phone"}</dt>
            <dd className="account-number">{number} <button type="button" className="copy-btn" onClick={() => copy(number)}>{copied === number ? <CheckCircle2 size={14}/> : <Copy size={14}/>} {copied === number ? "Copied" : "Copy"}</button></dd>
          </div>
          {method === "bank" && acc.branch && <div><dt>Branch</dt><dd>{acc.branch}</dd></div>}
        </dl> : <p className="bank-empty">The {activeItem.name} account details will be published here soon. Meanwhile, please <Link to="/contact">contact us</Link> if you would like to donate.</p>}
        {hasDetails && <p className="bank-note">After transferring, kindly send the receipt or confirmation SMS to our contact team so we can acknowledge and thank you.</p>}
      </div>}
    </div>}
  </div>;
}

