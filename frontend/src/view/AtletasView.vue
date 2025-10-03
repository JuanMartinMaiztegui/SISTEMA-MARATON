<template>
  <div>
    <p v-if="loading">Cargando ciudades...</p>
    <p v-else-if="ciudades.length === 0">No hay ciudades disponibles.</p>
    <AtletaList v-else :ciudades="ciudades" />
  </div>
</template>

<script>
import AtletaList from '../components/AtletaList.vue';
import { ref, onMounted } from 'vue';
import { useApi } from '../composables/useApi';

export default {
  components: { AtletaList },
  setup() {
    const { get } = useApi();
    const ciudades = ref([]);
    const loading = ref(true);

    const fetchCiudades = async () => {
      try {
        const res = await get('ciudades');
        ciudades.value = res.data;
        console.log('AtletaView fetchCiudades:', ciudades.value);
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCiudades();
    });

    return { ciudades, loading };
  }
};
</script>
