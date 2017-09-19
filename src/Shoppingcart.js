import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import constants from './constants'

// 声明拖拽的组件，有drop、hover、candrop方法
const ShoppingCartSpec={
  drop(){
    return{name: 'ShoppingCart :)'}
  }
};

// 设置拖拽实例，其实我不是很理解，总之这样可行
let collect = (connect, monitor)=>{
  return{
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
};

class ShoppingCart extends Component {
  render(){
    const{canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#ffffff';
    if(isActive){
      backgroundColor='#f7f7bd';
    } else if (canDrop){
      backgroundColor = '#f7f7f7'
    }
    const style = {backgroundColor: backgroundColor};
    return connectDropTarget(
        <div className="shopping-cart" style={style}>
          {isActive ?
            'Hum, snack!' :
            'Drag here to order !'}
        </div>
    )
  }

}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart)
