<template>
  <div class="review__container">
    <Review
      v-for="review in selectedReview"
      :review="review"
      :key="review.id"
      :selectedCardClass="selectedCardClass"
      :selectedReviewId="selectedReviewId"
      @reviewSelected="onReviewSelected"
    ></Review>

    <div v-if="selectedReviewId" class="col-3-of-3 icons">
      <button @click="onCardClick(null)" class="icon">
        <svg viewBox="0 0 512 512">
          <path
            d="M 192,130 L 260,130 C 525,132 505,335 439,448 C 434,453 425,452 424,440 C 440,320 400,255 260,258 L 192,258 L 192,323 C 191,337 175,343 166,335 L34,203 C 30,197 30,190 34,184 L166,52 C 175,44 191,50 192,64 Z"
          />
        </svg>
      </button>
      <div class="vendor-response">
        <p>Glad you liked it!</p>
        <div>
          <span class="review__author">John Doe</span>
          <span class="review__date">{{ "01/09/2019" | moment }}</span>
        </div>
      </div>
      <button @click="onCardClick(null)" class="meatball-menu">
        <span class="meatball"></span>
        <span class="meatball"></span>
        <span class="meatball"></span>
      </button>
    </div>
  </div>
</template>

<script>
import ReviewsData from "./reviews.json";
import Review from "../Review/index.vue";
import { momentMixin } from "../../mixins/moment.js";

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
  components: {
    Review
  },
  computed: {
    selectedReview() {
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
    onCardClick(review) {
      if (this.selectedReviewId) {
        this.selectedReviewId = null;
        this.selectedCardClass = null;
      } else {
        this.selectedReviewId = review.id;
        this.selectedCardClass = "selected";
      }
    },
    onReviewSelected(e) {
      this.onCardClick(e);
    }
  },
  mixins: [momentMixin]
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
    background: white;
    justify-content: space-evenly;
    padding: 2% 0;
  }

  .vendor-response {
    width: 86%;
  }

  .meatball-menu {
    display: flex;

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
    cursor: pointer;
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