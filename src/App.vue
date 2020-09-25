<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-content   v-bind:class="[$vuetify.breakpoint.xs ? change: '']">
      <!-- Provides the application the proper gutter -->
      <router-view></router-view>
    </v-content>

    <v-footer>
     
    </v-footer>
  </v-app>
</template>

<script lang="ts">

export default {
  name: 'App',

  components: {
  },
  
  data() {
    return {
      change:{
        change: true,
      }
    };
  },
};
</script>


<style lang="scss">
.change{
  padding-top: 0px !important;
}

</style>
