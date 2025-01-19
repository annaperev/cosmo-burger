import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
var domNode = document.getElementById('root');
var root = createRoot(domNode);
root.render(_jsx(StrictMode, { children: _jsx(App, {}) }));
//# sourceMappingURL=index.js.map