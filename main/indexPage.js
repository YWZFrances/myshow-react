import {Header,Footer,Content,SubHeader} from  "../components/common"

import React, {Component} from  "react"




class IndexPage extends Component　{
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
            <Header title={"首页"} />
            <Content>
            	<h1>首页</h1>
            	<a href="#/list/">进入列表</a>
            </Content>
                
                <Footer  />
            </div>
        )
    }
}
export  default  IndexPage