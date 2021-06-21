import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../Hooks/useLocalStorage'

function App() {

    const [html, setHtml] = useLocalStorage('html', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
                `)
        }, 500)

        return () => clearTimeout(timeout)
    }, [html, css, js])


    return ( 
    <>
        <div className= 'panel top-panel'>
        
            <Editor language= 'xml' displayName= 'HTML' value= {html} onChange= {setHtml} />

            <Editor language= 'javascript' displayName= 'JS' value= {js} onChange= {setJs} />
        
            <Editor language= 'css' displayName= 'CSS' value= {css} onChange= {setCss} />

        </div>

        <div className= 'panel bottom-panel'>
            <iframe 
            srcDoc= {srcDoc}
            title= 'output'
            sandbox= 'allow-scripts'
            frameBorder= '0'
            width= '100%'
            height= '100%'
            />
        </div>
    </>
    )
}
export default App;