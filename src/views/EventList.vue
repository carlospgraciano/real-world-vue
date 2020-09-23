<template>
    <div>
        <h1>Events for {{ user.user.name }}</h1>
        <EventCard
            v-for="event in event.events"
            :key="event.id"
            :event="event"
        />
        <template v-if="page != 1">
            <router-link
                :to="{ name: 'event-list', query: { page: page - 1 } }"
                rel="prev"
            >
                Prev Page
            </router-link>
            <router-link
                v-if="hasNextPage"
                :to="{ name: 'event-list', query: { page: page + 1 } }"
                rel="next"
            >
                | Next Page
            </router-link>
        </template>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
    name: 'EventList',
    components: {
        EventCard
    },
    computed: {
        page() {
            return parseInt(this.$route.query.page) || 1
        },
        hasNextPage() {
            return this.eventsTotal > this.page * this.perPage
        },
        ...mapState(['event', 'user'])
    },
    created() {
        this.perPage = 2
        this.fetchEvents()
    },
    methods: {
        fetchEvents() {
            this.$store.dispatch('event/fetchEvents', {
                perPage: this.perPage,
                page: this.page
            })
        }
    }
}
</script>
<style lang="scss" scoped></style>
