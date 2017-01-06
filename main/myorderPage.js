
import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import ReactDOM from "react-dom"

class StateList extends  Component{

    constructor (props){
        super(props)
    }
    render() {
        var data = this.props.stateData||["全部","未支付","待发货","待收货","待评价"];
        return (
            <ul className="order-state-list" >
                {
                    data.map((ele,i)=><li key={i}>
                        {ele}
                    </li>)
                }
            </ul>
        )
    }
}

class OrderProductInfo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        //this.props.productInfo
        var data = this.props.productInfo||[];
        console.log(data);
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

class Order extends Component{
	constructor(props){
        super(props)
    }
	render(){
		return (
			<div>
				qqq
			</div>
		)
	}
}


class MyorderPage extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="page" id="myorder-page">
				<Header title="我的订单" />
				<SubHeader>
					<StateList />
				</SubHeader>
				<Content hasFooter={false}>
					<Order />
				</Content>
				
			</div>
		)
	}
}

export  default  MyorderPage

