<template>
  <PageLayout>
    <section class="p-16">
      <h1>Группировка фильмов</h1>
      <draggable
        class="group_wrapper"
        draggable="true"
        @add="addGroup"
        group="cards"
        ghost-class="hidden-ghost"
      >
        <div v-for="(group, index) in groups" :key="index" class="group">
          <h1 class="group_title">Группа {{ index }}</h1>
          <draggable
            v-model="group.films"
            group="cards"
            @add="refreshLocalStorage"
            @end="onEnd(index)"
            class="group_draggable"
            draggable=".group_draggable_item"
          >
            <CinemaCard
              v-for="(cinema, index) in group.films"
              :key="cinema.kinopoiskId"
              :cinema="cinema"
              :rating="getRatingFilms[cinema.id]"
              :tags="getTagsForFilm(cinema)"
              :index="index + 1"
              class="group_draggable_item"
            />
          </draggable>
        </div>
      </draggable>
    </section>
  </PageLayout>
</template>

<script>
import draggable from "vuedraggable";
import { RouteNames } from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout";
import CinemaCard from "../cinema/CinemaCard.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { PageLayout, draggable, CinemaCard },
  name: "GroupCinema",
  data() {
    return {
      oldGroupIndex: 0,
      isNewGroup: false,
    };
  },
  computed: {
    routeNames() {
      return RouteNames;
    },
    ...mapGetters("cinema", [
      "getFilmsWithFilter",
      "getRatingFilms",
      "getTagsForFilm",
    ]),
    ...mapGetters("group", ["getGroups"]),

    groups() {
      return this.getGroups;
    },
    films() {
      return this.getFilmsWithFilter({
        field: "rating",
        reverse: false,
        type: "ALL",
      });
    },
  },
  mounted() {
    this.initializeStore();
    if (!localStorage.getItem("groups")) {
      this.updateGroups([{ films: this.films }]);
    }
  },
  methods: {
    ...mapMutations("group", [
      "initializeStore",
      "addGroupCinema",
      "updateGroups",
      "removeGroup",
      "refreshGroups",
    ]),
    addGroup(event) {
      const newIndex = event.newIndex;
      const target = event.item._underlying_vm_;
      const newObj = {
        films: [
          {
            coverUrl: target.coverUrl,
            id: target.id,
            kinopoiskId: target.kinopoiskId,
            name: target.name,
            originalName: target.originalName,
            previewUrl: target.previewUrl,
            score: target.score,
            type: target.type,
            year: target.year,
          },
        ],
      };
      this.addGroupCinema({ group: newObj, index: newIndex });
      this.oldGroupIndex = newIndex;
      this.isNewGroup = true;
    },
    onEnd(groupIndex) {
      if (this.isNewGroup) {
        const target = this.groups.splice(this.oldGroupIndex, 1);
        this.groups.splice(groupIndex + 1, 0, target[0]);
        this.updateGroups(this.groups);
        this.isNewGroup = false;
      }

      if (this.groups[groupIndex].films.length === 0 && groupIndex !== 0) {
        this.removeGroup(groupIndex);
      }
    },
    refreshLocalStorage() {
      this.refreshGroups();
    },
  },
};
</script>



<style lang="less">
.group {
  width: 99%;
  border: 1px solid silver;
  border-radius: 8px;
  background: #bdbdbd;
  margin-top: 15px;
  &_wrapper {
    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto;
  }
  &_title {
    padding-left: 20px;
  }
  &_draggable {
    display: flex;
    justify-content: start;
    min-height: 50px;
    padding: 10px;
    gap: 0px 10px;
    overflow: hidden;
    overflow-x: auto;
  }
  &_draggable_item {
    min-width: 300px;
    max-width: 300px;
    background: lightgray;
    border-radius: 10px;
  }
}
.hidden-ghost {
  display: none;
}
</style>