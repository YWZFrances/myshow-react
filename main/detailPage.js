import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import {Tools} from  "../tools/tools"

//详情内容
class DetailPage extends Component {
	constructor(props){
		super(props);
		//需要的数据
		this.state={
			bannerList:[],
			goodsName:"",
			price:"",
			number:"",
			goodsID:""
		};
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:this.props.params.goodsID},(data)=>{
			console.log(data)
			console.log(data[0].goodsName)
			this.setState({
				bannerList:[],
				goodsName:data[0].goodsName,
				price:data[0].price,
				number:data[0].number,
				goodsID:data[0].goodsID
			})
		})
	}
	addCart(){
		//判断用户是否登录
		var userID = Tools.getUserID();
		userID && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
		{userID:userID,goodsID:this.state.goodsID,number:1},function(data){
			console.log(data);
			if(data == 1){
				alert("添加成功")
			}else{
				alert("添加失败")
			}
		})
	}
	toCart(){
		//判断用户是否登录，登陆之后再跳转
		Tools.getUserID() && (window.location.hash = "#/cart")
	}
	render(){
		return (
			<div>
			<Header title={"购物车"} />
			<Content>
				<ul>
					<li>
						<p>{this.state.goodsName}</p>
						<p>{this.state.price}</p>
						<p>{this.state.number}</p>
					</li>
				</ul>
				<button onClick={()=>this.addCart()}>加入购物车</button>
				<button onClick={()=>this.toCart()}>去购物车</button>
			</Content>
				
			<Footer />
			</div>
		)
	}
}

export  default  DetailPage













