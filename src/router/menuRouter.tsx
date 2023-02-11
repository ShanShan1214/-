import React, { Component, Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Menu from "../view/menu"
import Home from "../view/Home"
import orderblanka from "../view/orderblank"
export default function menu() {
    return (
        <div>
            <Router>
                <Suspense fallback={<div>loading....</div>}>
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/menu" component={Menu}></Route>
                        <Route path="/menu/parta" component={Menu}></Route>
                        <Route path="/order/:id" component={orderblanka}></Route>
                    </Switch>
                </Suspense>
            </Router>
        </div>
    )
}
