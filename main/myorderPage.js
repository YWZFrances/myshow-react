import React,{Component} from "react"
import {Header,SubHeader,Content} from "../components/common"


//class StateList extends  Component{
//
//  constructor (props){
//      super(props)
//  }
//  changeState(index){
//      console.log(index)
//      this.props.selectOrderState(index)
//  }
//  render() {
//      var data = this.props.stateData||["全部","未支付","待发货","待收货","待评价"];
//      return (
//          <ul className="order-state-list" >
//              {
//                  data.map((ele,i)=><li key={i} onClick={()=>this.changeState(i)}>
//                      {ele}
//                  </li>)
//              }
//          </ul>
//      )
//  }
//}


//class OrderBtns extends  Component{
//
//  constructor (props){
//      super(props)
//  }
//  cancelOrder(orderID){
//      this.props.cancelOrder(orderID)
//  }
//  render() {
//      var state = this.props.orderState;
//
//      return (
//          <div className="order-btns">
//              {
//                  state==1?<div>
//                      <em>待付款</em>
//                      <button>立即付款</button>
//                      <button onClick={()=>this.cancelOrder(this.props.orderID)}>取消订单</button>
//                  </div>:state==2?<div>
//                      <em>待发货</em>
//                      <button>提醒发货</button>
//                  </div>:state==3?<div>
//                      <em>待收货</em>
//                      <button>确认发货</button>
//                  </div>:<div>
//                      <em>待评价</em>
//                      <button>去评价</button>
//                  </div>
//              }
//
//          </div>
//      )
//  }
//}

class OrderProductInfo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        //this.props.productInfo
        var data = this.props.productInfo||[];
//      console.log(data);
//      console.log(this.state.orderData)
        return (
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg}/>
                        <div className="text-info">
                            <p>{ele.goodsName} </p>
                        </div>
                        <div className="num-info">
                            <p><em>${ele.price}</em></p>
                            <p>*{ele.number}</p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}


class OrderList extends  Component{

    constructor (props){
        super(props)
    }
    render() {
        var data = this.props.orderData||[];
        console.log(data); //所有的订单
        return (
            <ul className="order-list" >
                {
                    data.map((ele,i)=><li className="order-item" key={i}>
                        {/*ele 是每一个条订单的信息
                         ele.orderProductInfo 每条订单的商品信息
                        */}
                        <OrderProductInfo productInfo={ele.orderProductInfo}/>
                        <div className="total-info">
                            <span>总数量:<em>{ele.totalNumber}</em></span>
                            <span>总金额:<em>{ele.totalPrice}</em></span>
                        </div>
                        
                    </li>)
                }
            </ul>
        )
    }
}







class OrderListPage extends  Component{

    constructor (props){
        super(props);
        //所有的订单
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        console.log(data)
        this.state = {
            orderData:data
        };
    }
    render() {
        return (
            <div className="page" id="order-list-page">
                <Header title="我的订单" />
                <SubHeader>
                </SubHeader>
                <Content hasSubHeader={true} hasIScroll={true}>
                    <OrderList orderData={this.state.orderData} cancelOrder={this.cancelOrder} />
                    
                </Content>
            </div>
        )
    }


}


export  default  OrderListPage






