import { createStore } from 'vuex'

export default createStore({
  state: {
    history:{},
    oldest:0
  },
  mutations: {
    setHistory(state , hist){
      if(Object.keys(state.history).length <= 4){
        state.history[hist.key] = hist.value;
      }else{
        const keys = Object.keys(state.history);
        const keyToRemove = keys[state.oldest];
        let newHistObject = {}
        newHistObject[hist.key] = hist.value;
        delete state.history[keyToRemove];
        state.history = {
          ...newHistObject,
          ...state.history
        }
        if(state.oldest === 4){
          state.oldest = 0;
        }else{
          state.oldest = state.oldest + 1;
        }
      }



    }

  },
  actions: {},
  getters: {
    history (state) {
      const results = [];
      const keys =  Object.keys(state.history);
      keys.forEach((key)=>{
        const from = key.split('-')[0];
        const to = key.split('-')[1];
        results.push({
          from,
          to,
          value:state.history[key]
        })

      })
      return results;
    }

  }
})