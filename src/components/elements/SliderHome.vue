<template>
    <vueper-slides fixed-height="500px">
        <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"/>
    </vueper-slides>

</template>

<style>

</style>

<script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'

  export default {
      components: { VueperSlides, VueperSlide },
      name: 'SliderHome',

      data: () => ({
          slides: [
              {
                  image: require('@/assets/slider/images/img4.png')
              },
              {
                  image: require('@/assets/slider/images/img5.png')
              },
              {
                  image: require('@/assets/slider/images/img6.png')
              },
          ]
      })
  }
</script>