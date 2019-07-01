import routerConfig from './routerConfig'
import renderRoutes from './renderRoutes'

const App = () => (
    renderRoutes({
        routes: routerConfig
    })
)

export default App
