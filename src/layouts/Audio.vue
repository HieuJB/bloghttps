<template>
    <div v-if="ShowPlayAudio" class="absolute left-0 bg-blue-100 mt-5 ml-2 rounded-2xl shadow-2xl">
        <div class=" h-5 flex justify-end mt-1 mr-1">
            <svg @click="ClosePlayAudio" xmlns="http://www.w3.org/2000/svg" class="font-bold hover:text-red-400 text-purple-500 cursor-pointer  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
        </div>
        <img class="object-cover h-24 w-24  mx-auto p-1  bg-pink-200 my-1 rounded-full shadow-2xl" id="ImageRotate" :src="Audio[0]" />
        <article>
            <div class="wrapper text-blue-400 font-medium">
                <ul class="marquee ">
                    <li>{{Audio[1]}}</li>
                </ul>
                <ul class="marquee2 ">
                    <li>{{Audio[1]}}</li>
                </ul>
            </div>
        </article>
        <audio ref="player" controls autoplay class="w-60 bg-gray-100 outline-none">
            <source :src="Audio[2]" type="audio/mpeg">
        </audio>
    </div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'Audio',
    data() {
        return {
            ShowPlayAudio: false,
        }
    },
    computed: mapGetters(['Audio']),
    methods: {
        ClosePlayAudio() {
            this.ShowPlayAudio = false;
        }
    },
    mounted() {
        this.$watch('Audio', function () {
            this.$refs.player.load()
        })
    },
    watch: {
        Audio() {
            this.ShowPlayAudio = true;
        }
    }

}
</script>

<style>

</style>
