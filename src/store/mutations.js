import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'

export default {
		// mutations唯一目的修改state状态
		// mutations j尽可能写简单逻辑和处理数据，actions处理复杂逻辑
		[ADD_COUNTER](state, payload) {
			payload.count++
		},
		[ADD_TO_CART](state, payload) {
			state.cartList.push(payload)
		}
	}