/**
 * Created by Administrator on 2017/1/3.
 */
var ScrollOptions = {
    // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
    preventDefault: false,
    // 禁止缩放
    zoom: true,
    // 支持鼠标事件，因为我开发是PC鼠标模拟的
    mouseWheel: false,
    // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
    probeType: 2,
    // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
    bounce: true,
    // 展示滚动条
    scrollbars: true,
}

export {ScrollOptions}