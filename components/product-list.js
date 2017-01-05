/**
 * Created by hasee on 2016/12/30.
 */


import React,{Component} from "react"


//列表商品展示
/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
	//当在react的class中需要设置state的初始值或者是绑定事件的时候可以用constructor
     constructor(props){
         super(props)
     }
     //渲染商品列表
     render(){
         return (
             <ul className="product-list">
                 {
                 	//商品的东西，循环出来 在listPage JS中用到
                     this.props.productData.map((ele,i)=><li key={i}>
                     {/*href={"#/detail/"+ele.goodsID} 这里是点击商品图片进入到此商品的详情页
                       	用路由控制进入detail页面，然后加个/ 后面是点击的哪个物品的编号，给他加上去，
                       	就成了#/detail/3类似于这样的网址，就能进入编号为3的物品的详情页了*/}
                         <a href={"#/detail/"+ele.goodsID}><img src={ele.goodsListImg}/></a>
                         <p>{ele.goodsName}</p>
                     </li>)
                 }
             </ul>
         )
     }

}
ProductList.defaultProps={
    productData:[]
};

//暴露出这个组件，default默认 然后会在listPage.JS用到
export default ProductList