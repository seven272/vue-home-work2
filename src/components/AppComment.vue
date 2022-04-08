<template>
 <div class="card">
     <h2>Комментарии</h2>
     <ul class="list" v-if="listComments.length !== 0">
       <li class="list-item" v-for="(comment, ind) in listComments" :key="ind">
         <div>
           <p><strong>{{ comment.email }}</strong></p>
           <small>{{ comment.text }}</small>
         </div>
       </li>
     </ul>
     <h3 v-else> Нажимтие "Загрузить комментарии"</h3>
 </div>
</template>

<script>
export default {
  name: 'AppComment',
  // props: ['listComments'],
  props: {
    listComments: {
      type: Array,
      default: () => []

    }
  },
  data: () => ({
  })

}
</script>

<style>

</style>
