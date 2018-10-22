import {
	SAVE_PLAN,
	DEL_PLAN,
	ADD_TOTAL_TIME,
	DEC_TOTAL_TIME
} from './types.js'

const state = {
	list:[],
	totalTime:0
};

const mutations = {
	[SAVE_PLAN](state,plan){
		const pic = '/src/assets/images/pic.jpg';
		const name = 'Ltz';
		const plans = Object.assign({name,pic},plan);
		state.list.push(plans);
	},
	[DEL_PLAN](state,index){
		state.list.splice(index,1);
	},
	[ADD_TOTAL_TIME](state,hour){
		state.totalTime+=hour;
	},
	[DEC_TOTAL_TIME](state,hour){
		state.totalTime-=hour;
	}
};

const getters = {
	list:state=>state.list,
	totalTime:state => state.totalTime
}

export default{
	state,
	mutations,
	getters
}