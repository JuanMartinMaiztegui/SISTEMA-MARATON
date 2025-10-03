<template> 
  <div class="container mt-4">
    <h2 class="mb-4">Ciudades</h2>
    <ul class="list-group mb-4">
      <li v-for="ciudad in ciudades" :key="ciudad.id" class="list-group-item d-flex justify-content-between align-items-center">
        {{ ciudad.nombre }}
        <div>
          <button @click="editCiudad(ciudad)" class="btn btn-warning btn-sm me-2">Editar</button>
          <button @click="deleteCiudad(ciudad.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </div>
      </li>
    </ul>
    <CiudadForm 
      :ciudadEditar="ciudadSeleccionada" 
      @refresh="fetchCiudades" 
      @cancelarEdicion="cancelarEdicion" 
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../composables/useApi';
import CiudadForm from './CiudadForm.vue';

export default {
  components: { CiudadForm },
  setup() {
    const { get, del } = useApi();
    const ciudades = ref([]);
    const ciudadSeleccionada = ref(null); 

    const fetchCiudades = async () => {
      const res = await get('ciudades');
      ciudades.value = res.data;
    };

    const deleteCiudad = async (id) => {
      await del(`ciudades/${id}`);
      fetchCiudades();
      ciudadSeleccionada.value = null; 
    };

    const editCiudad = (ciudad) => {
      ciudadSeleccionada.value = { ...ciudad }; 
    };

    const cancelarEdicion = () => {
      ciudadSeleccionada.value = null;
    };

    onMounted(fetchCiudades);

    return {
      ciudades,
      fetchCiudades,
      deleteCiudad,
      editCiudad,
      ciudadSeleccionada,
      cancelarEdicion
    };
  }
}
</script>
