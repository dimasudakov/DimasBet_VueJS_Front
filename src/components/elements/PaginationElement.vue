<template>
    <div class="text-center">
        <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                                :length="this.length"
                                :page="currentPage"
                                v-on:update:model-value="handlePageChange"
                                class="my-4"
                                color="primary"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
  export default {
      name: 'PaginationElement',
      props: {
          length: null,
          page: null,
      },
      data() {
          return {
              currentPage: 0,
              totalLength: 0,
          };
      },
      created() {
          this.currentPage = this.page;
          this.totalLength = this.length;
      },
      methods: {

          handlePageChange(newPage) {
              this.currentPage = newPage;
              this.$emit('data-updated', newPage);
          },

      }

  }
</script>

<style scoped>

</style>