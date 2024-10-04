<template>
  <my-todo></my-todo>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MyTodo from "@/components/MyTodo.vue";

defineComponent({
  сomponents: { MyTodo },
  name: "MyApp",
});
</script>

<style lang="scss"></style>
