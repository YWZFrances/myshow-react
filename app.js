/**
 * Created by hasee on 2017/1/3.
 */
import React, {Component} from  "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory} from "react-router"
import IndexPage from "./main/indexPage"
import ListPage from "./main/listPage"
import DetailPage from "./main/detailPage"
import CartPage from "./main/cartPage"
import Login from "./main/login"
import ConfirmPage from "./main/confirmPage"



ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail(/:goodsID)" component={DetailPage} />
    <Route path="cart" component={CartPage}  />
    <Route path="login" component={Login}  />
    <Route path="confirm" component={ConfirmPage}  />

</Router>,document.getElementById("main"));





if (module.hot) {
    module.hot.accept();
}