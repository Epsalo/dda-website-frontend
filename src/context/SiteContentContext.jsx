import React from "react";
import { getSiteContent } from "../api/siteContent.api";

const SiteContentContext = React.createContext({ content: null, refresh: () => {} });

export function SiteContentProvider({ children }) {
  const [content, setContent] = React.useState(null);
  React.useEffect(() => {
    getSiteContent().then(setContent).catch(() => setContent({}));
  }, []);
  const refresh = () => getSiteContent().then(setContent).catch(() => {});
  return <SiteContentContext.Provider value={{ content, refresh }}>{children}</SiteContentContext.Provider>;
}

export const useSiteContent = () => React.useContext(SiteContentContext);
