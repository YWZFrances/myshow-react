import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"




class Login extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div>
                <h1>登录</h1>
            </div>
        )
    }
}
export  default  Login