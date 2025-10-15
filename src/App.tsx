import { BrowserRouter } from "react-router-dom"
import React, { lazy, Suspense } from "react"
import { PageLoader } from "./components/PageLoader"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const AppRouter = lazy(() => import('./router/AppRouter'))

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter >
          <Suspense fallback={<PageLoader />}>
            <AppRouter />
            {/* Container cho thông báo */}
            <div
              id="notification-container"
              className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[300px] max-w-[90vw]"
            ></div>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

export default App