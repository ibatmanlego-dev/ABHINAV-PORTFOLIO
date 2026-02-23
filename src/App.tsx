import { ReactLenis } from 'lenis/react'
import HomePage from './Home'
import FloatingContact from './components/FloatingContact'

function App() {
  return (
    <ReactLenis root options={{ duration: 1.5 }}>
      <HomePage />
      <FloatingContact />
    </ReactLenis>
  )
}

export default App
