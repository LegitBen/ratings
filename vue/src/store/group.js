export default {
  namespaced: true,
  state: {
    groups: [
        {
        films: [],
      },
    ]
  },
  getters: {
    getGroups: (state) => state.groups
  },
  mutations: {
    initializeStore(state) {
      // При инициализации хранилища загружаем состояние из localStorage
        if (localStorage.getItem('groups')) {
            state.groups = JSON.parse(localStorage.getItem('groups'));
        }
    },
    addGroupCinema(state, {group,index}) {
      state.groups[index] = group;
      // Сохраняем обновленные данные в localStorage
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    updateGroups(state, groups) {
      state.groups = groups;
      // Сохраняем обновленные данные в localStorage
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    refreshGroups(state) {
        localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    removeGroup(state, index) {
      state.groups.splice(index, 1);
      // Обновляем данные в localStorage
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
    clearGroups(state) {
      state.groups = [{ films: [] }];
      localStorage.setItem('groups', JSON.stringify(state.groups));
    },
  }
}
