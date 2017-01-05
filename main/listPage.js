import {Header,Footer,Content,SubHeader} from  "../components/common"
//此处用到ProductList组件 在product-list.js暴露出来的
import ProductList from "../components/product-list"
import React, {Component} from  "react"
import {ScrollOptions} from '../config/config'
import ReactDOM from "react-dom"
import ReactIScroll from 'react-iscroll'
import "../css/common.css"

/*商品分类列表*/
class ClassList extends Component {
	//当你在React class中需要设置state的初始值或者绑定事件时
	//用constructor
    constructor (props){
        super(props)
    }
    //分类点击函数，传入的值是分类商品的classID值
    handleClick(id){
    	//调用函数时调用changeClassID函数，并且传入classID值
        this.props.changeClassID(id)
    }
    //渲染 商品分类列表
    render(){
        return (
            <ul className="class-list">
                {
                	//点击事件
                    this.props.classData.map((ele,index)=><li onClick={()=>this.handleClick(ele.classID)} key={index}>{ele.className}</li>)
                }
            </ul>
        )
    }
}
//DefaultProps 方法可以用来设置组件属性的默认值
ClassList.defaultProps={
    classData:[]
};

/*商品页面的顶层组件*/
class ListPage extends Component {
    constructor(props){
//让react 的Component 帮你实现组件的方法
        super(props) ;
//getInitialState 方法用于定义初始状态，也就是一个对象，
//这个对象可以通过 this.state 属性读取。
//当用户点击组件，导致状态变化，this.setState 方法就修改状态值，
//每次修改以后，自动调用 this.render 方法，再次渲染组件。
//productData是列表的东西(循环出商品)=>在product-list JS里
        this.state= {
            classData:[],
            productData:[],
        };
        
        //设置默认的数据请求选项
        //分类：无分类
        this.classID = undefined;
        //每组数据需要显示的条目（默认10，可选）
        this.linenumber = 5;
        //显示第几组数据索引（默认0）每组数据显示10条
        this.pageCode = 0;
        //刷新滚动条 true刷新 false不刷新
        this.refresh = false
        $.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{
        	/*如果这个数据的类型是字符串 那么数据变成JSON格式*/
            if(typeof data ==="string"){
                data = JSON.parse(data)
            }
			/*设置数据classData就是请求下来的data*/
            this.setState({
                classData:data
            })
        },"json");
        //请求商品数据
        //显示出什么数据  默认0 调用getProductData函数
        this.getProductData(this.pageCode)
}
    
    //分类，改变classID
    changeClassID(id){
    	console.log(id)
    	console.log(this)
    	//classID就等于点击到的那个元素对应的id值
    	this.classID = id;
    	//先渲染一页
    	this.pageCode = 0;
    	//调用getProductData函数请求数据
    	this.getProductData()
    	//refs 当前组件里面所有设置了ref属性的元素的集合
    	console.log(this.refs.iScroll)
    	//分类完之后，让滚动条回到最上面
    	this.refs.iScroll.withIScroll(function(iScroll){
    	iScroll.scrollTo(0,0)
    	})
    }
    
   
    //请求商品数据
    getProductData(){
    	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
    		"classID":this.classID,
    		"linenumber":this.linenumber,
    		"pageCode":this.pageCode
    	},(data)=>{
    		console.log(data)
    		//如果有数据的话，判断paceCode是不是为0
    		//为0只显示一页（滚动条长的），如果不是的话，concat方法用于连接两个或多个数组
    		//如果不是0，那么就和之前的数据相加(不这样的话会把之前的数据覆盖掉)
        	if(data){
        		//会把之前的数据覆盖掉
        		//this.setState({
//      			productData:data
//      		})
				this.setState({
					productData:this.pageCode == 0?data:this.state.productData.concat(data)
				})
			}
        })
    }
    
    onScrollEnd(myScroll){
//      myScroll是ReactIScroll提供的操作滚动条的对象
//滚动完成时打印end
      console.log("end")
      //如果需要刷新时，pageCode=0，再次请求数据，调用getProductData函数 然后不让滚动条刷新 改成false
      //如果下拉的和最底下小于20，打印加载更多，多加载一页，调用getProductData函数请求数据
      if (this.refresh){
          this.pageCode=0;
          this.getProductData();
          this.refresh = false
      }else if(myScroll.y-myScroll.maxScrollY<=20){ 
      	//需要当前的滚动条的位置和最大的滚动数值
          console.log('加载更多');
          this.pageCode++
          this.getProductData()
      }
  }
	//onScroll事件 元素滚动时执行这个函数    
    onScroll(myScroll){
    	console.log("scroll");
    	//下拉超过60，打印刷新
    	if(myScroll.y>60){
    		console.log("刷新")
    		//然后刷新状态变成可以刷新
    		this.refresh = true
    	}
    }
    //渲染页面
    render() {
        console.log("render");
        return (
            <div className="page" id="list-page">
                <Header title="列表" hasSearch={true}  />
                <SubHeader>
                {/*改变分类，id为classID*/}
                    <ClassList changeClassID={(id)=>this.changeClassID(id)} classData={this.state.classData} />
                </SubHeader>
                <Content hasFooter={true} hasSubHeader={true} >
                	<ReactIScroll 
                	ref="iScroll"
                	iScroll={IScroll}
                	options={ScrollOptions}
                	onScroll={(myScroll)=>this.onScroll(myScroll)}
                	onScrollEnd={(myScroll)=>this.onScrollEnd(myScroll)}
                	>
                		<ProductList productData={this.state.productData} />
                	</ReactIScroll>
                    
                </Content>
                <Footer  active={1} />
            </div>
        )
    }
}

ListPage.defaultProps= {
    listData:[]
};



export  default  ListPage
/*zepto 不是按照模块的规范编写的*/



