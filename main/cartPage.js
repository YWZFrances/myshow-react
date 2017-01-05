/**
 * Created by hasee on 2017/1/4.
 */

import {Header,Content,SubHeader,Footer} from  "../components/common"
import {Tools} from  "../tools/tools"
import React,{Component} from  "react"
import  "../css/common.css"
import  "../css/cart.css"

class CartList extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <ul className="cart-list">
                {
                    this.props.cartData.map((ele,i)=><li key={i} className="cart-item" >
                        <a href="###" className="pic"><img src={ele.goodsListImg} /></a>
                        <div className="info">
                            <p className="p-name">{ele.goodsName}</p>
                            <p className="price"><em className="jiage">${ele.price}</em></p>
                            <div className="num-wrap">
                                <span className="jian" onClick={()=>this.props.changeData(-1,i)}  >-</span>
                                <input className="geshu" type="text" value={ele.number} />
                                <span className="jia" onClick={()=>this.props.changeData(1,i)} >+</span>
                            </div>
                        </div>
                        <a className="delete" onClick={()=>this.props.changeData(0,i)}  href="javascript:void (0);" >删除</a>
                        <div className="clear"></div>
                    </li>)
                }
            </ul>
        )
    }
}

class CartPage extends Component {
    constructor(props){
        super(props);

        this.state={
            cartData:[],
            totalNumber:0,
            totalPrice:0
        };

        var id = Tools.getUserID();
        id && $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:id},(data)=>{
            console.log(data);
            this.setState({
                cartData:data
            });
            this.getTotal(data)
        });

        this.changeData = this.changeData.bind(this)
    }

    changeData(type,index){
        console.log(this)
        console.log(type);
        console.log(index)
        var userID = Tools.getUserID();
        var data = this.state.cartData;
        var id = data[index].goodsID;
        var number = data[index].number;
        if(type){
            //加减
            number=type+number*1;
            data[index].number = number
        }else {
            //删除
            number=0;
            data.splice(index,1)
        }
        this.setState({
            cartData:data
        });
        this.getTotal(data)
        var sendData = {"userID":userID,"goodsID":id,"number":number}
        //数据请求
        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",sendData,function (data) {
                console.log(data)
            },"json")
    }
    getTotal(data){
        var number = 0;
        var price = 0;
        for(var i=0;i<data.length;i++){
            number+=data[i].number*1;
            price+=data[i].number*data[i].price
        }

        this.setState({
            totalNumber:number,
            totalPrice:price
        });
    }
    
    
    
    toConfirm(){
        window.localStorage.setItem("cartData",JSON.stringify({
            totalPrice:this.state.totalPrice,
            totalNumber:this.state.totalNumber,
            productInfo:this.state.cartData
        }));
        window.location.hash="#/confirm"
    }
    render() {
      /*  var number = 0;
        var price = 0;
        var data  = this.state.cartData;
        for(var i=0;i<data.length;i++){
            number+=data[i].number*1;
            price+=data[i].number*data[i].price
        }*/

        return (
            <div className="page" id="cart-page">
                <Header title="购物车" rightBtn={<a href="javascript:;" onClick={()=>this.toConfirm()}>结算</a>} />
                <SubHeader>
                    <div className="cart-bar">
                        <span>总数:{this.state.totalNumber}</span>
                        <span>总金额:${this.state.totalPrice}</span>
                    </div>
                </SubHeader>
                <Content hasFooter={true} hasSubHeader={true}>
                    <CartList changeData={this.changeData} cartData={this.state.cartData}/>
                </Content>
                <Footer shuliang={this.state.totalNumber} active="2"/>
            </div>
        )
    }
}

export default  CartPage