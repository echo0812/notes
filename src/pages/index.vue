<template>
  <div>
    <div><router-link to="notes/index">个人笔记</router-link></div>
    <router-view/>
    <ec-date></ec-date>
  </div>
</template>

<script>
import ecDate from '../components/ecDate'
export default {
  name: 'app',
  components: {
    ecDate
  }
}
</script>

<style>
</style>
