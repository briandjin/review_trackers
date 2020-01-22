import moment from "moment";

export const momentMixin =  {
    filters: {
        moment: function(date) {
          return moment(date).format("DD/MM/YYYY");
        },
    },
  }