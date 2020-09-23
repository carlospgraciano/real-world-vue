import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
    events: [],
    eventsTotal: 0,
    event: {}
}

export const mutations = {
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
}

export const actions = {
    async createEvent({ commit, dispatch }, event) {
        try {
            await EventService.postEvent(event)
            commit('ADD_EVENT', event)

            const notification = {
                type: 'success',
                message: 'Your event has been created!'
            }
            dispatch('notification/add', notification, { root: true })
        } catch (error) {
            const notification = {
                type: 'error',
                message: 'There was a problem creating event: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })

            throw error
        }
    },
    async fetchEvents({ commit, dispatch }, { perPage, page }) {
        try {
            const { data, headers } = await EventService.getEvents(
                perPage,
                page
            )
            commit('SET_EVENTS', data)
            commit('SET_EVENTS_TOTAL', headers['x-total-count'])
        } catch (error) {
            const notification = {
                type: 'error',
                message: 'There was a problem fetching events: ' + error.message
            }

            dispatch('notification/add', notification, { root: true })
        }
    },
    async fetchEvent({ commit, getters, dispatch }, id) {
        const event = getters.getEventById(id)

        if (event) {
            commit('SET_EVENT', event)
        } else {
            try {
                const response = await EventService.getEventById(id)
                commit('SET_EVENT', response.data)
            } catch (error) {
                const notification = {
                    type: 'error',
                    message:
                        'There was a problem fetching event: ' + error.message
                }

                dispatch('notification/add', notification, { root: true })
            }
        }
    }
}

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}
