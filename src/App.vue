/* eslint-disable vue/no-unused-components */
<template>
  <div class="container column">
    <app-build-summary @add-block="addNewBlock"> </app-build-summary>
    <div class="card card-w70" >
      <!-- Пример построения резюме через компоненты -->
      <!-- <component :is="`app-${elem.type}`" v-for="(elem, ind) in blocks" :key="ind" v-bind="{value: elem.value}"></component> -->
      <ul v-if="items.length !== 0">
        <li  v-for="(elem, ind) in items" :key="ind" v-html="elem"></li>
      </ul>
      <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
    </div>
  </div>
  <div class="container">
    <p>
      <app-button
      @click-btn = "loadComments"
      :colorBtn = "'primary'"
      > Загрузить комментарий
      </app-button>
    </p>
    <app-loader v-if="isLoading"></app-loader>
    <app-comment :list-comments="comments" v-else></app-comment>
  </div>
</template>

<script>
import AppBuildSummary from '@/components/AppBuildSummary.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppSubtitle from '@/components/AppSubtitle.vue'
import AppText from '@/components/AppText.vue'
import AppAvatar from '@/components/AppAvatar.vue'
import AppComment from '@/components/AppComment.vue'
import AppLoader from '@/components/AppLoader.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    'app-build-summary': AppBuildSummary,
    // eslint-disable-next-line vue/no-unused-components
    'app-title': AppTitle,
    // eslint-disable-next-line vue/no-unused-components
    'app-subtitle': AppSubtitle,
    // eslint-disable-next-line vue/no-unused-components
    'app-text': AppText,
    // eslint-disable-next-line vue/no-unused-components
    'app-avatar': AppAvatar,
    'app-comment': AppComment,
    'app-loader': AppLoader
  },
  data: () => ({
    blocks: [],
    items: [],
    typeNow: 'title',
    comments: [],
    isLoading: false
  }),
  computed: {
    findNameComponent () {
      let nameComponent = ''
      if (this.typeNow === 'title') {
        nameComponent = 'app-title'
      } else if (this.typeNow === 'subtitle') {
        nameComponent = 'app-subtitle'
      } else if (this.typeNow === 'text') {
        nameComponent = 'app-text'
      } else if (this.typeNow === 'avatar') {
        nameComponent = 'app-avatar'
      }

      return nameComponent
    }
  },
  methods: {
    addNewBlock (date) {
      if (date.type === 'title') {
        const tmpl = `<h1> ${date.value} </h1>`
        this.items.push(tmpl)
        this.typeNow = 'title'
        this.blocks.push(date)
      } else if (date.type === 'subtitle') {
        const tmpl = `<h2> ${date.value} </h2>`
        this.items.push(tmpl)
        this.typeNow = 'subtitle'
        this.blocks.push(date)
      } else if (date.type === 'text') {
        const tmpl = `<p> ${date.value} </p>`
        this.items.push(tmpl)
        this.typeNow = 'text'
        this.blocks.push(date)
      } else if (date.type === 'avatar') {
        const tmpl = `<div class="avatar">
                        <img src=${date.value}>
                      </div>`
        this.items.push(tmpl)
        this.typeNow = 'avatar'
        this.blocks.push(date)
      }
    },
    async loadComments () {
      this.isLoading = true
      const URL = 'https://jsonplaceholder.typicode.com/comments?_limit=42'
      // можно так const response = await axios.get(URL)
      // а можно сделать реструктуризацию так как в обьекте data лежат необходимые нам данные
      const { data } = await axios.get(URL)
      const keys = Object.keys(data)
      // eslint-disable-next-line no-unused-vars
      const result = keys.map(key => {
        return {
          id: data[key].id,
          email: data[key].email,
          text: data[key].body
        }
      })
      setTimeout(() => {
        this.comments = result
        this.isLoading = false
      }

      , 1500)
    }
  }

}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }

  .card ul li {
    list-style-type: none;
    padding: 0;
  }
</style>
