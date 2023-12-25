import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import MainLayout from "#app/pages/layout/MainLayout";
import AppContext from "#app/components/hooks/app_context/AppContext";
import {app__hooks} from "#app/components/_app";
import {ConfigProvider, theme,} from "antd";
import {AppContextTypes} from "#app/components/hooks/app_context/AppContext";

import lang from 'antd/locale/ru_RU';
import EmployeePage from "#app/pages/employee/EmployeePage";

function App() {

    const [th, setTh] = app__hooks.useState<'dark' | 'light'>(
        ['light'].includes(String(localStorage.getItem('theme'))) ?
            'light' :
            'dark'
    )

    let themeDefaults = {
        light: {
            colorBgBase: '#ffffff',
            colorPrimary: '#3462a1',
            colorTextBase: '#3462a1',
            colorBgInput: '#ffffff',
            pageBgColor: '#f1f1f1',
            errorColor: 'rgba(183,0,0,0.65)',
            themeAlg: theme.defaultAlgorithm
        },
        dark: {
            colorBgBase: '#21212d',
            colorPrimary: '#eeeeee',
            colorTextBase: '#ffffff',
            colorBgInput: '#2d2d47',
            pageBgColor: '#21212d',
            errorColor: '#ffafaf',
            themeAlg: theme.darkAlgorithm
        }
    }

    app__hooks.useEffect(() => {
        let bo = document.getElementsByTagName('body').item(0)
        if (bo) {
            bo.style.backgroundColor = themeDefaults[th].pageBgColor
        }
    }, [th])

    let sizeDefault = 4
    let fontSizeDefault = 1
    let borderRadius = 2
    let borderWidth = 1

    theme.defaultConfig.override.override.colorBgBase = themeDefaults[th].colorBgBase
    theme.defaultConfig.override.override.colorPrimary = themeDefaults[th].colorPrimary
    theme.defaultConfig.override.override.colorTextBase = themeDefaults[th].colorTextBase

    theme.defaultConfig.override.override.borderRadius = borderRadius
    theme.defaultConfig.override.override.lineWidth = borderWidth
    theme.defaultConfig.override.override.fontSize = (13 + fontSizeDefault)
    theme.defaultConfig.override.override.controlHeight = (40 + sizeDefault)
    theme.defaultConfig.override.override.colorError = themeDefaults[th].errorColor
    theme.defaultConfig.override.override.lineType = 'solid' //'solid'

    let root: AppContextTypes = {
        toggleTheme: () => {
            let newTheme: 'light' | 'dark' = th === 'dark' ? 'light' : 'dark'
            setTh(newTheme)
            localStorage.setItem('theme', newTheme)
        }
    }


    return (
        <AppContext.Provider value={root}>

            <ConfigProvider locale={lang} theme={{
                algorithm: themeDefaults[th].themeAlg,
                components: {
                    Button: {
                        controlHeight: (35 + sizeDefault),
                        fontSize: (12 + fontSizeDefault),
                    },
                    Input: {
                        colorBgContainer: themeDefaults[th].colorBgInput,
                    },
                    Menu: {
                        colorBorder: 'green',
                        colorBorderBg: 'green',
                        colorBorderSecondary: 'green',
                        colorPrimaryBorder: 'green',
                        colorBgBase: 'red',
                        colorBgLayout: 'red'
                    }
                }
            }} direction="ltr">
                <div style={{backgroundColor: themeDefaults[th].pageBgColor}} className="app-content">
                    <BrowserRouter>
                        <MainLayout>
                            <EmployeePage className={'employee-container'}/>
                        </MainLayout>
                    </BrowserRouter>
                </div>
            </ConfigProvider>
        </AppContext.Provider>
    );
}

export default App;
