import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Api from '../services/Api'

Vue.use(Vuex)
Vue.use(VueAxios, Axios)

export default new Vuex.Store(
{
	state:
	{
		user:
		{
			name:"",
			surname:"",
			email:"",
			role:"-1",
			token:"",
		},
		agricultures:[],
		fields:[]
	},
	getters:
	{
		SURNAME:	state => { return state.user.surname; },
		NAME:		state => { return state.user.name; },
		EMAIL:		state => { return state.user.email; },
		ROLE:		state => { return state.user.role; },
		TOKEN:		state => { return state.user.token; }
	},
	mutations:
	{
		SET_SURNAME:	(state, surname)	=> { state.user.surname = surname; },
		SET_NAME:		(state, name)		=> { state.user.name = name; },
		SET_EMAIL:		(state, email)		=> { state.user.email = email; },
		SET_ROLE:		(state, role)		=> { state.user.role = role; },
		SET_TOKEN:		(state, token)		=> { state.user.token = token; }
	},
	actions:
	{
		LOGIN: async (context, data) =>
		{
			await Api().post('/user-login', data)
			.then(response =>
			{
				context.commit('SET_SURNAME',	response.data.surname);
				context.commit('SET_NAME',		response.data.name);
				context.commit('SET_EMAIL',		response.data.email);
				context.commit('SET_ROLE',		response.data.role);
				context.commit('SET_TOKEN',		response.data.token);
			})
			.catch(error =>
			{
				console.log(error.response)
			});
		},
		SIGNUP: async (context, data) =>
		{
			await Api().post('/user-signup', data)
			.then(response =>
			{
				context.commit('SET_SURNAME',	response.data.surname);
				context.commit('SET_NAME',		response.data.name);
				context.commit('SET_EMAIL',		response.data.email);
				context.commit('SET_ROLE',		response.data.role);
				context.commit('SET_TOKEN',		response.data.token);
			})
			.catch(error =>
			{
				console.log(error.response)
			});
		}
	},
	modules:
	{
	},
	strict: true
})
