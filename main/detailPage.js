import {Header,Footer,Content,SubHeader} from  "../components/common"
import React, {Component} from  "react"
import {Tools} from  "../tools/tools"
import  "../css/swiper-3.3.1.min.css"
import  "../components/swiper.js"

//详情页面-------------------------------------------------------------------------------
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
				bannerList:JSON.parse(data[0].imgsUrl),
				goodsName:data[0].goodsName,
				price:data[0].price,
				buynumber:data[0].buynumber,
				goodsID:data[0].goodsID
			})
		})
	}
	addCart(){
		//判断用户是否登录
		var id = JSON.parse(Tools.getUserID());
		id && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
		{"userID":id.username,"goodsID":this.state.goodsID,"number":1},function(data){
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
			<Header title="商品详情" rightBtn={<a href="javascript:;" onClick={this.toCart}>购物车</a>} />
                <Content>

                        <div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
                            <div className="swiper-wrapper">
                                {
                                    this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
                                        <img src={ele} />
                                    </div>)
                                }
                            </div>
                        </div>
                    <div ref="pagination" className="swiper-self-pagination"></div>
                    <div className="text-info">
                        <div className="p-name">{this.state.goodsName}</div>
                        <div className="p-price">￥{this.state.price}</div>
                        <div className="p-number">购买人数：{this.state.buynumber}</div>
                    </div>
                    <div><button onClick={()=>this.addCart()} className="add-cart">添加到购物车</button></div>
                </Content>
				
			<Footer />
			</div>
		)
	}
}

export  default  DetailPage













