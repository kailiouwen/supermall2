import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'

export default{
		// context->{state,commit}
		addCart(context, payload) {
			let oldProduct = null;
			for(let item of context.state.cartList){
				if (item.iid === payload.iid) {
					oldProduct = item;
				}
			}

			// 2.判断oldProduct是否存在，存在+1，不存在新添加一类数据
			if (oldProduct) {
				//oldProduct.count += 1
				context.commit(ADD_COUNTER, oldProduct)
			} else {
				payload.count = 1
				//state.cartList.push(payload)
				context.commit(ADD_TO_CART, payload)
			}
		}
	}