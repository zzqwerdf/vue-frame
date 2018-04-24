import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import state      from './state'
import mutations  from './mutation'

export default new Vuex.Store({
	state,
	mutations,
});















