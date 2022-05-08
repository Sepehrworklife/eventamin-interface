import React, { createContext, useMemo, useState } from "react";

export const RFPContext = createContext({
	rfp: [],
	setRfp: () => {},
});

const RFPProvider = ({ children }) => {
	const [rfp, setRfp] = useState([]);
	const value = useMemo(() => ({ rfp, setRfp }), [rfp]);

	return <RFPContext.Provider value={value}>{children}</RFPContext.Provider>;
};


export default RFPProvider;
