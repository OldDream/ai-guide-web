import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// NOTE: StrictMode is intentionally off. It double-invokes effects in dev,
// which tears down GSAP animations/ScrollTriggers via useGSAP's cleanup and
// the second pass does not always restore them — so every animation froze.
// StrictMode has no effect in the production build regardless.
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

