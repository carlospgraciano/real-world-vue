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
        events: [],
        eventsTotal: 0,
        event: {}
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        },
        SET_EVENTS_TOTAL(state, eventsTotal) {
            state.eventsTotal = eventsTotal
        },
        SET_EVENT(state, event) {
            state.event = event
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
        },
        async fetchEvents({ commit }, { perPage, page }) {
            try {
                const { data, headers } = await EventService.getEvents(
                    perPage,
                    page
                )
                commit('SET_EVENTS', data)
                commit('SET_EVENTS_TOTAL', headers['x-total-count'])
            } catch (error) {
                console.log('There was an error:', error.response)
            }
        },
        async fetchEvent({ commit, getters }, id) {
            const event = getters.getEventById(id)

            if (event) {
                commit('SET_EVENT', event)
            } else {
                try {
                    const response = await EventService.getEventById(id)
                    commit('SET_EVENT', response.data)
                } catch (error) {
                    console.log('There was an error', error.response)
                }
            }
        }
    },
    getters: {
        getEventById: state => id => {
            return state.events.find(event => event.id === id)
        }
    },
    modules: {}
})
