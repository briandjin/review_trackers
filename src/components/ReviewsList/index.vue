<template>
  <div class="review__container">
    <!-- <Review
      class="review col-1-of-3"
      v-for="review in computedReviews"
      :key="review.id"
      :class="selectedCardClass"
    ></Review>-->
    <div
      v-for="review in computedReviews"
      :key="review.id"
      :class="selectedCardClass"
      class="review col-1-of-3"
    >
      <!-- <div class="review col-1-of-3" :class="selectedCardClass"> -->
      <button @click="handleCardClick(review)">
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

      <p v-html="truncateText(review.content) "></p>
      <span class="review__author" v-html="review.author"></span>
      <span class="review__date">{{ review.published_at | moment }}</span>
    </div>
    <div v-if="selectedReviewId" class="col-3-of-3 icons">
      <button @click="handleCardClick(null)" class="icon">
        <svg viewBox="0 0 512 512">
          <path
            d="M 192,130 L 260,130 C 525,132 505,335 439,448 C 434,453 425,452 424,440 C 440,320 400,255 260,258 L 192,258 L 192,323 C 191,337 175,343 166,335 L34,203 C 30,197 30,190 34,184 L166,52 C 175,44 191,50 192,64 Z"
          />
        </svg>
      </button>
      <p>Glad you liked it!</p>
      <div>
        <span class="review__author">John Doe</span>
        <span class="review__date">{{ "01/09/2019" | moment }}</span>
      </div>
      <button @click="handleCardClick(null)" class="meatball-menu">
        <span class="meatball"></span>
        <span class="meatball"></span>
        <span class="meatball"></span>
      </button>
    </div>
  </div>
</template>

<script>
import ReviewsData from "./reviews.json";
// import Review from "../Review/index.vue";
import moment from "moment";

export default {
  name: "ReviewsList",
  data() {
    return {
      ReviewsData,
      selectedReviewId: null,
      selectedCardClass: null,
      textTruncated: false
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  },
  computed: {
    computedReviews() {
      if (this.selectedReviewId) {
        const filteredArr = [];
        this.ReviewsData.forEach(review => {
          if (review.id === this.selectedReviewId) {
            filteredArr.push(review);
            return;
          }
        });
        return filteredArr;
      }
      return this.ReviewsData;
    }
  },
  methods: {
    truncateText(content) {
      console.log("content", content);
      if (!this.selectedReviewId) {
        if (content.length > 100) {
          let arr = content.substring(0, 100).split(" ");
          let popped = arr.pop();
          console.log(arr, popped);
          return arr.join(" ") + "<button>...Read more</button>";
        }
      }
      return content;
    },
    handleCardClick(review) {
      if (this.selectedReviewId) {
        this.selectedReviewId = null;
        this.selectedCardClass = null;
      } else {
        this.selectedReviewId = review.id;
        this.selectedCardClass = "selected";
      }
    }
    // truncateText(review) {
    //   if (review.content.length > 100) {
    //     return review.content.splice(0, 100);
    //   }
    //   return review.content;
    // }
  }
};
</script>

<style lang="scss">
.review__container {
  display: flex;
  flex-flow: row wrap;
  background: #8d95a3;
  padding-bottom: 4%;

  [class*="col-"] {
    margin-top: 4%;
    margin-left: 4%;
  }

  .col-1-of-3 {
    flex: 0 0 28%;
  }
  .col-2-of-3 {
    flex: 0 0 44%;
  }
  .col-3-of-3 {
    flex: 0 0 92%;
  }

  .review {
    background: white;
    flex: 0 0 92%;
    padding: 2%;

    &.selected {
      flex: 0 0 92%;
      padding: 2% 7%;
    }

    @media (min-width: 650px) {
      flex: 0 0 44%;
    }
    @media (min-width: 900px) {
      flex: 0 0 28%;
    }

    p {
      text-align: left;
      font-size: 15px;
    }
  }
  .icons {
    display: flex;
    padding: 2% 7%;
    display: flex;
    flex-direction: column;
    background: white;
    position: relative;
  }

  .meatball-menu {
    display: flex;
    position: absolute;
    right: 3em;
    top: 3em;

    .meatball {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #097ae6;
      margin-right: 2px;
    }
  }

  .icon {
    padding: 5px;
    display: inline-block;
    fill: #097ae6;
    stroke: #097ae6;
    text-align: center;
    position: absolute;
    left: 3em;
    top: 3em;
  }

  .icon svg {
    --size: 1.8em;

    fill: inherit;
    height: var(--size);
    width: var(--size);
  }

  button {
    border: none;
    text-align: left;
    padding: 0;
    background: white;

    &:hover {
      cursor: pointer;
    }
  }

  .review__place {
    text-align: left;
    font-size: 1.9em;
    color: black;
  }
  .review__author {
    text-align: left;
    font-size: 0.9em;
    color: black;
  }

  .review__date {
    margin-left: 1.5em;
    font-size: 0.9em;
    color: #cacfd5;
  }
}

.stars {
  display: flex;

  .star {
    polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars] {
    .star polygon {
      fill: #ffd055;
    }
  }

  &[data-stars="1"] {
    .star:nth-child(1) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="2"] {
    .star:nth-child(2) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="3"] {
    .star:nth-child(3) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="4"] {
    .star:nth-child(4) ~ .star polygon {
      fill: #d8d8d8;
    }
  }

  &[data-stars="5"] {
    .star:nth-child(5) ~ .star polygon {
      fill: #d8d8d8;
    }
  }
}
</style>