import React from 'react';

export type AppContextTypes = {
    toggleTheme?: () => void
}
const AppContext = React.createContext<AppContextTypes>({});

export default AppContext;
