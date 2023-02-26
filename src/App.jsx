import { Suspense } from 'react'
import Home from './pages/home.jsx'
import Index from './pages/index.jsx'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
export default function App() {
  return (
    <Suspense fallback={<h1>加载中...</h1>}>
      <HashRouter>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/index" component={Index}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="*" component={Home}></Route>
        </Switch>
      </HashRouter>
    </Suspense>
  )
}
