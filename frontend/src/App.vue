<template>
  <div class="container mt-4">
    <h1 class="mb-4">🏃 Sistema de Estadísticas de Maratón</h1>

    <nav class="mb-4">
      <router-link to="/ciudades" class="btn btn-outline-primary me-2">Ciudades</router-link>
      <router-link to="/atletas" class="btn btn-outline-success">Atletas</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f9f9f9;
}
</style>
