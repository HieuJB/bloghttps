<template>
  <div class="bg-gray-100 w-full">
    <div class="flex justify-between font-medium py-2 w-11/12 mx-auto">
      <a href="" class="text-xs xl:text-sm">TIN NỔI BẬT</a>
      <p
        @click="showAll"
        class="
          text-xs text-medium text-gray-500
          cursor-pointer
          hover:text-blue-500
          xl:text-sm
        "
      >
        XEM TẤT CẢ
      </p>
    </div>
    <div class="w-11/12 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(GetFavoritePost, index) in GetFavoritePost.slice(0, 4)"
          :key="index"
          class="col-span-1"
        >
          <div
            class="
              bg-white
              mx-auto
              rounded-xl
              shadow-xl
              overflow-hidden
              border border-gray-200
            "
          >
            <div class="grid grid-cols-5 h-full">
              <div class="col-span-2 h-full">
                <img
                  class="
                    oobject-cover
                    h-44
                    w-full
                    p-2
                    rounded-2xl
                    cursor-pointer
                    transform
                    hover:scale-110
                  "
                  :src="GetFavoritePost.background_img"
                />
              </div>

              <div class="col-span-3 p-1 relative">
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    /></svg
                  ><small class="font-medium text-gray-500 pl-1">{{
                    GetFavoritePost.hit_count
                  }}</small>
                </div>
                <a
                  href=""
                  class="text-gray-500 font-medium hover:text-pink-600"
                  >{{ GetFavoritePost.name_categorie }}</a
                >
                <div class="text-md text-gray-700">
                  <router-link
                    :to="{ name: 'Post', params: { id: GetFavoritePost.id } }"
                    class="font-medium hover:text-blue-800 text-blue-500"
                    >{{ GetFavoritePost.heading }}</router-link
                  >
                </div>
                <div class="flex absolute bottom-0 py-2 w-full ">
                  <div>
                    <img
                      class="
                        inline
                        object-cover
                        w-12
                        h-12
                        mr-2
                        rounded-full
                        border-2 border-gray-300
                        hover:border-green-500
                        cursor-pointer
                        transform
                        hover:scale-110
                      "
                      :src="GetFavoritePost.avatar_link"
                    />
                  </div>
                  <router-link
                    :to="{
                      name: 'Posted',
                      params: { name: GetFavoritePost.name },
                    }"
                    class="flex flex-col"
                  >
                    <a class="font-medium text-gray-700" href="">{{
                      GetFavoritePost.name
                    }}</a>
                    <p class="text-gray-600" href="">
                      {{
                        moment(GetFavoritePost.published_at).format(
                          "k:mm-MMM-Qo"
                        )
                      }}
                    </p>
                  </router-link>
                  <div class="absolute right-0 mr-1 md:mr-4 pt-1 cursor-pointer">
                    <svg @click="PlayAudio(GetFavoritePost.background_img,GetFavoritePost.heading,GetFavoritePost.podcast)" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-blue-400 hover:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HotNews",
  props: {
    theme: Number,
  },
  computed: mapGetters(["GetFavoritePost"]),
  methods: {
    ...mapActions(["actionGetFavoriteThemedArticles"]),
    ...mapActions(["actiongetfavoritePost"]),
    test(){
      alert('dasdasd');
    },
    showAll() {
      if (this.theme == 0) {
        this.actiongetfavoritePost();
        router.push({
          name: "Search",
        });
      } else {
        this.actionGetFavoriteThemedArticles(this.theme);
        router.push({
          name: "Search",
        });
      }
    },
    PlayAudio(background,heading,podcast){
      const data =[background,heading,podcast]
      this.$store.commit('MUTATIONS_PLAYAUDIO',data)
    }
  },
  mounted() {
    if (this.theme == 0) {
      this.actiongetfavoritePost();
    } else {
      this.actionGetFavoriteThemedArticles(this.theme);
    }
    //   console.log(this.theme);
  },
};
</script>

<style>
</style>
