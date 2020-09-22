import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            id: 'abc123',
            name: 'Adam Jahr'
        },
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ],
        events: [
            { id: 1, title: '...', organizer: '...' },
            { id: 2, title: '...', organizer: '...' },
            { id: 3, title: '...', organizer: '...' },
            { id: 4, title: '...', organizer: '...' },
            { id: 5, title: '...', organizer: '...' }
        ]
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        }
    },
    actions: {
        async createEvent({ commit }, event) {
            try {
                await EventService.postEvent(event)
                commit('ADD_EVENT', event)
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.filter(event => event.id == id)
        }
    },
    modules: {}
})
