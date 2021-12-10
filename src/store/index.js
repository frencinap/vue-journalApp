import { createStore } from "vuex";

import journalModule from "../modules/daybook/store/journal";

const store = createStore({
  modules: {
    journalModule,
  },
});

export default store;
