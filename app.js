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
import ConfirmPage from "./main/confirmPage"
import MyorderPage from "./main/myorderPage"
import {Login} from "./main/login"
import {Registered} from "./main/registered1"
import {Show} from "./main/show"
import {More} from "./main/more"
import YouhuiPage from "./main/youhuiPage"
import ShoucangPage from "./main/shoucangPage"
import {Change} from "./main/change"
import {View} from "./main/view"
import GuanyuPage from "./main/guanyuPage"



ReactDOM.render(<Router history={hashHistory}>


	
    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail(/:goodsID)" component={DetailPage} />
    <Route path="cart" component={CartPage}  />
    <Route path="confirm" component={ConfirmPage}  />
    <Route path="myorder" component={MyorderPage}  />
    <Route path="login" component={Login}  />
    <Route path="registered" component={Registered}  />
    <Route path="show" component={Show}  />
    <Route path="more" component={More}  />
    <Route path="youhui" component={YouhuiPage}  />
    <Route path="shoucang" component={ShoucangPage}  />
    <Route path="change" component={Change}  />
    <Route path="view" component={View}  />
    <Route path="guanyu" component={GuanyuPage}  />

</Router>,document.getElementById("main"));




if (module.hot) {
    module.hot.accept();
}




//import {Registered1} from "./main/registered1"
//import {Login} from "./main/login"
//import {Show} from "./main/show"
//import {More} from "./main/more"
//import {Change} from "./main/change"
//import {View} from "./main/view"
//
//
//
//  <Route path="Login" component={Login}  />
//  <Route path="Registered1" component={Registered1}  />
//<Route path="Login" component={Login} />
//<Route path="Show" component={Show}  />
//<Route path="More" component={More}  />
//<Route path="Change" component={Change}  />
//<Route path="View" component={View}  />