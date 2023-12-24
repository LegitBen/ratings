<template>
  <draggable
    class="groups-container"
    draggable="true"
    @add="addGroup"
    group="cards"
    ghost-class="hidden-ghost"
  >
    <div v-for="(group, index) in groups" :key="index" class="group">
      <h2>Группа {{ index }}</h2>
      <draggable
        v-model="group.items"
        group="cards"
        @end="onEnd(index)"
        class="draggable-area"
        draggable=".draggable-item"
      >
        <div v-for="card in group.items" :key="card.id" class="draggable-item">
          {{ card.name }}
        </div>
      </draggable>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      oldGroupIndex: 0,
      isNewGroup: false,
      groups: [
        {
          items: [
            { id: 1, name: "The Shawshank Redemption" },
            { id: 2, name: "The Godfather" },
            { id: 3, name: "The Harry Potter" },
            { id: 4, name: "Zweropolis" },
            { id: 5, name: "Film 5" },
            { id: 6, name: "Film 6" },
            { id: 7, name: "Film 7" },
          ],
        },        
      ],
    };
  },
  methods: {
    addGroup (event) {
      const id = event.item._underlying_vm_.id;
      const name = event.item._underlying_vm_.name;
      const newIndex = event.newIndex;
      const newObj = { items: [{ id, name }] };
      this.groups[newIndex] = newObj;
      this.oldGroupIndex = newIndex;
      this.isNewGroup = true;
    },
    onEnd (groupIndex) {
      if (this.isNewGroup) {
        const target = this.groups.splice(this.oldGroupIndex, 1);
        this.groups.splice(groupIndex + 1, 0, target[0]);
        this.isNewGroup = false;
      }
      if (this.groups[groupIndex].items.length === 0 && groupIndex !== 0) {
        this.groups.splice(groupIndex, 1);
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.groups-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column-reverse;
}
.group {
  border: 1px solid silver;
  background: #bdbdbd;
  margin: 20px 0;
}
.draggable-area {
  display: flex;
  justify-content: start;
  min-height: 50px;
  padding: 10px;
}
.draggable-item {
  width: 100px;
  height: 100px;
  padding: 5px;
  margin: 5px 5px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.hidden-ghost {
  display: none;
}
</style>