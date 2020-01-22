<template>
  <div class="review col-1-of-3">
    <!-- <div class="review col-1-of-3" :class="selectedCardClass"> -->
    <button @click="handleReviewClick">
      <!-- <button @click="handleCardClick(review)"> -->
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

    <p>{{ review.content | truncateText }}</p>
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
    selectedReviewClass: [String, null],
    selectedReviewId: [String, null]
  },
  methods: {
    handleReviewClick() {
      //   console.log(this.review.id);
      this.$emit("asdf", this.review);
    }
  },
  filters: {
    truncateText(content) {
      if (content.length > 100) {
        let arr = content.substring(0, 100).split(" ");
        arr.pop();
        return arr.join(" ") + "...";
      }
      return content;
    }
  },
  mixins: [momentMixin]
};
</script>

<style>
</style>