import { BrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import { PageLoader } from "./components/PageLoader"

const AppRouter = lazy(() => import('./router/AppRouter'))

const App = () => {
  return (
    <BrowserRouter >
      <Suspense fallback={<PageLoader/>}>
        <AppRouter/>
      </Suspense>
    </BrowserRouter>
  )
}

export default App