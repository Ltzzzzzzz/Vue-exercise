import * as types from './types.js'
export default {
	savePlan:({commit},plan)=>{
		commit(types.SAVE_PLAN, plan);
	},
	del:({commit},index)=>{
		commit(types.DEL_PLAN, index)
	},
	addTotalTime:({commit},hour)=>{
		commit(types.ADD_TOTAL_TIME,hour)
	},
	decTotalTime:({commit},hour)=>{
		commit(types.DEC_TOTAL_TIME,hour)
	}
	
}