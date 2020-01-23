<template>
  <div :class="selectedCardClass" class="review col-1-of-3">
    <button @click="onReviewClick">
      <h3 class="review__place">{{review.place}}</h3>
      <div class="stars" :data-stars="review.rating">
        <svg
          v-for="(rating, i) in 5"
          :key="i"
          height="25"
          width="23"
          class="star rating"
          :data-rating="i + 1"
        >
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
            style="fill-rule:nonzero;"
          />
        </svg>
      </div>
    </button>
    <p>
      {{truncateText}}
      <button v-if="!selectedCardClass" @click="onReviewClick">...Read more</button>
    </p>
    <span class="review__author" v-html="review.author"></span>
    <span class="review__date">{{ review.published_at | moment }}</span>
  </div>
</template>

<script>
import { momentMixin } from "../../mixins/moment.js";

export default {
  name: "Review",
  props: {
    review: Object,
    selectedReviewId: [String, null],
    selectedCardClass: [String, null]
  },
  data() {
    return {
      textTruncated: false
    };
  },
  computed: {
    truncateText() {
      if (!this.selectedReviewId) {
        if (this.review.content.length > 100) {
          let arr = this.review.content.substring(0, 100).split(" ");
          arr.pop();
          return arr.join(" ");
        }
      }
      return this.review.content;
    }
  },
  methods: {
    onReviewClick() {
      if (!this.selectedReviewId) {
        this.$emit("reviewSelected", this.review);
      } else {
        this.$emit("reviewSelected", null);
      }
    }
  },
  mixins: [momentMixin]
};
</script>

<style>
</style>