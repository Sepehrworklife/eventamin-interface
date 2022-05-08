import React from 'react';
import useDarkMode from 'use-dark-mode';



const ToogleThemeColor = (props) => {
	const {value: isDark, toogle: toogleDarkMode} = useDarkMode();	
	return (
		<>

			<button onClick={toogleDarkMode}>switch</button>
		</>
	);
}


export default ToogleThemeColor;
