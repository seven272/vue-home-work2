<template>
 <form class="card card-w30" @submit.prevent="submitHandler">
   <div class="form-control" >
     <label for="type">Тип блока</label>
     <select id="type" v-model="datesBlock.type">
       <option value="title">Заголовок</option>
       <option value="subtitle">Подзаголовок</option>
       <option value="avatar">Аватар</option>
       <option value="text">Текст</option>
     </select>
   </div>

   <div class="form-control">
     <label for="value">Значение</label>
     <textarea :style="{'border-color': errors.description ? 'red' : 'grey'}" class="error" :class="{'error': errors.description}" id="value" rows="3" v-model.trim="datesBlock.value"></textarea>
     <small v-if="errors.description">{{ errors.description }}</small>
   </div>
  <app-button
  :colorBtn="'primary'"
  :disabled="datesBlock.value.length < 3"
  @click="$emit('addBlock', datesBlock)"
  >Добавить</app-button>
 </form>

</template>
<script>
export default {
  name: 'AppBuildSummary',
  components: {
  },
  data: () => ({
    errors: {
      description: null
    },
    datesBlock: {
      type: 'title',
      value: ''
    }
  }),
  methods: {
    descriptionIsValid () {
      let isValid = true
      if (this.datesBlock.value.length < 3) {
        isValid = false
        this.errors.description = 'Введите больше 3-х символов'
      } else {
        this.errors.description = null
      }
      return isValid
    },
    submitHandler () {
      if (this.descriptionIsValid()) {
        this.datesBlock.type = 'title'
        this.datesBlock.value = ''
      }
    }
  }

}
</script>
<style scoped>

</style>
