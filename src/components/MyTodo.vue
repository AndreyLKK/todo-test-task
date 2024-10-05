<template>
  <div class="todo">
    <div class="container">
      <header class="header">
        <h1 class="header__title">ToDo list</h1>
      </header>
      <main class="main">
        <div class="content">
          <input
            class="content__input"
            placeholder="Добавить задачу..."
            type="text"
            v-model.trim="myStore.addTask"
            v-on:keyup.enter="myStore.handlerAddTask(idx)"
          />
          <button class="content__button" @click="myStore.handlerAddTask">
            <my-icon class="content__icon" type="add"></my-icon>
            <span class="visually-hidden">Добавления задачи</span>
          </button>
        </div>

        <ul class="task">
          <li
            class="task__item"
            v-for="(task, idx) in myStore.currentTasks()"
            :key="idx"
            tabindex="0"
          >
            <span class="visually-hidden"
              >Текст списка номер {{ idx + 1 }}. Задача
              {{ myStore.tasks[idx].completed ? "выполнена" : "не выполнена" }}
            </span>
            <p
              class="task__text"
              @click="myStore.doneTask(idx)"
              :style="{
                textDecoration: myStore.tasks[idx].completed
                  ? 'line-through wavy #ff0000'
                  : 'none',
              }"
              v-if="
                !myStore.tasks[idx + myStore.pages * myStore.itemsPerPage]
                  .editing
              "
            >
              {{ task.title }}
            </p>
            <template
              v-if="
                myStore.tasks[idx + myStore.pages * myStore.itemsPerPage]
                  .editing
              "
            >
              <input
                class="task__input"
                type="text"
                v-model="myStore.edTask"
                v-on:keyup.enter="
                  focusTaskButton(idx + myStore.pages * myStore.itemsPerPage)
                "
                :style="{
                  color: myStore.tasks[
                    idx + myStore.pages * myStore.itemsPerPage
                  ].edditing
                    ? '#000000'
                    : '#9da09d',
                }"
                :aria-labelledby="'editing-message'"
                :ref="
                  (el) =>
                    (inputTask[idx + myStore.pages * myStore.itemsPerPage] = el)
                "
              />
              <span class="visually-hidden" id="editing-message"
                >Редактирование задачи, нажмите Etner, чтобы закончить
                редактирование</span
              >
            </template>

            <div class="task__controls">
              <button
                class="task__button task__button-completed"
                @click="myStore.doneTask(idx)"
              >
                <my-icon type="check"></my-icon>
                <span class="visually-hidden"
                  >Кнопка пометить задачу, как выыполненную</span
                >
              </button>
              <button
                class="task__button task__button-edditing"
                ref="buttonEd"
                @click="
                  myStore.edditingTask(idx);
                  focusTaskInput(idx);
                "
              >
                <my-icon type="editing"></my-icon>
                <span class="visually-hidden">Редактирования задачи</span>
              </button>
              <button
                class="task__button task__button-remove"
                @click="myStore.removeTask(idx)"
              >
                <my-icon type="delete"></my-icon>
                <span class="visually-hidden">Удаления задачи</span>
              </button>
            </div>
          </li>
        </ul>
        <ul class="pagination">
          <li
            class="pagination__item"
            v-for="page in myStore.totalPages()"
            :key="page"
          >
            <button
              class="pagination__button"
              :class="{ activePage: myStore.pages === page - 1 }"
              @click="myStore.handlerPagination(page - 1)"
            >
              <span class="visually-hidden">Номер страницы</span>
              {{ page }}
            </button>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, nextTick, onUnmounted } from "vue";
import { useMyStore } from "@/store/store";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import MyIcon from "@/UI/MyIcon.vue";

const myStore = useMyStore();

defineComponent({
  сomponents: { MyIcon },
});

const inputTask = ref<(HTMLElement | null)[]>([]);
const buttonEd = ref<(HTMLElement | null)[]>([]);

onMounted(() => {
  myStore.tasks = getLocalStorage("tasks");

  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  myStore.tasks.map((el) => (el.editing = false));
  setLocalStorage("tasks", myStore.tasks);
};

function focusTaskInput(idx: number) {
  nextTick(() => {
    const inputElement = inputTask.value[idx];
    if (inputElement) return inputElement.focus();
  });
}

function focusTaskButton(idx: number) {
  const buttonElement = buttonEd.value[idx];
  if (buttonElement) {
    buttonElement.focus();
    myStore.tasks[idx].title = myStore.edTask;
    myStore.tasks[idx].editing = false;
    setLocalStorage("tasks", myStore.tasks);
  }
}
</script>

<style lang="scss">
.todo {
  display: flex;
  align-items: center;
}

.container {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  text-align: center;
  padding-top: 20px;
  margin-bottom: 40px;
}

.main {
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: flex-end;
  border-bottom: 2px solid #808080;
  padding-bottom: 40px;

  &__input {
    font-size: 16px;
    display: block;
    width: 100%;
    height: 40px;
    background-color: #dcdcdc;
    border-radius: 50px;
    padding: 10px 60px 10px 30px;
    transition: background 0.5s;

    &::placeholder {
      font-size: 16px;
      color: #9da09d;
    }

    &:hover {
      background-color: #f0eeee;
    }
    &:active {
      background-color: #c4c4c4;
    }
  }

  &__button {
    font-size: 16px;
    background-color: #37e19a;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    transition: background 0.5s;

    &:hover {
      background-color: #7cecbd;
      svg {
        transition: fill 0.5s;
        fill: #9adcc0;
      }
    }

    &:active {
      background-color: #3ed898;
      svg {
        transition: fill 0.5s;
        fill: #20ad72;
      }
    }

    &:focus {
      border: 3px solid #00bcd4;
    }
  }
}

.task {
  padding-top: 40px;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #dcdcdc;
    padding: 20px 30px 20px 30px;
    border-radius: 50px;
    word-wrap: break-word;
    cursor: pointer;
    transition: transform 0.3s;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    &:hover {
      transform: translate(5px, -5px);
    }

    &:focus {
      outline: inherit;
      border: 3px solid #00bcd4;
    }
  }

  &__text {
    cursor: pointer;
  }

  &__input {
    background-color: #dcdcdc;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  &__button {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: background 0.5s;

    &-completed {
      background-color: #37e19a;
      &:hover {
        background-color: #7cecbd;
        svg {
          transition: fill 0.5s;
          fill: #9adcc0;
        }
      }

      &:active {
        background-color: #3ed898;
        svg {
          transition: fill 0.5s;
          fill: #20ad72;
        }
      }

      &:focus {
        border: 2px solid #00bcd4;
      }
    }

    &-edditing {
      background-color: #f1d686;
      &:hover {
        background-color: #f4e3af;
        svg {
          transition: fill 0.5s;
          fill: #c9b26d;
        }
      }
      &:active {
        background-color: #edcd6d;
        svg {
          transition: fill 0.5s;
          fill: #fcecbc;
        }
      }

      &:focus {
        border: 2px solid #00bcd4;
      }
    }

    &-remove {
      background-color: #f44336;

      &:hover {
        background-color: #fc8a81;
        svg {
          transition: fill 0.5s;
          fill: #9b534e;
        }
      }
      &:active {
        background-color: #ba2419;
        svg {
          transition: fill 0.5s;
          fill: #aa7e7a;
        }
      }

      &:focus {
        border: 2px solid #00bcd4;
      }
    }
  }
}

.pagination {
  padding-top: 40px;
  display: flex;

  &__item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__button {
    background-color: #9eeccb;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #7cecbd;
    }

    &:active {
      background-color: #3ed898;
    }
    &:focus {
      border: 2px solid #00bcd4;
    }
  }
}

.activePage {
  background-color: #37e19a;
}
</style>
