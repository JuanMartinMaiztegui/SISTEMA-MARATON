<template>
  <div>
    <h2>Atletas</h2>
    <ul class="list-group mb-4">
      <li
        v-for="atleta in atletas"
        :key="atleta.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
        {{ atleta.nombre }} - DNI: {{ atleta.dni }} - Tiempo: {{ atleta.tiempo }} - Posición: {{ atleta.posicion }} - Ciudad: {{ atleta.ciudad?.nombre }}
        </span>
        <span v-if="atleta.posicion === 1"> 🥇</span>
        <span v-else-if="atleta.posicion === 2"> 🥈</span>
        <span v-else-if="atleta.posicion === 3"> 🥉</span>
        <div>
          <button @click="editAtleta(atleta)" class="btn btn-sm btn-warning me-2">Editar</button>
          <button @click="deleteAtleta(atleta.id)" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </li>
    </ul>

    <div v-if="ciudades.length > 0">
      <AtletaForm
        :ciudades="ciudades"
        :atletaEditar="atletaSeleccionado"
        @refresh="handleRefresh"
        @cancelarEdicion="cancelarEdicion"
      />
    </div>
    <div v-else>
      <p>No hay ciudades disponibles para seleccionar.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../composables/useApi';
import AtletaForm from './AtletaForm.vue';

export default {
  components: { AtletaForm },
  props: ['ciudades'],
  setup(props) {
    const { get, del } = useApi();
    const atletas = ref([]);
    const atletaSeleccionado = ref(null);

    const fetchAtletas = async () => {
      try {
        const res = await get('atletas');
        atletas.value = res.data;
      } catch (error) {
        console.error('Error al cargar atletas:', error);
      }
    };

    const deleteAtleta = async (id) => {
      try {
        await del(`atletas/${id}`);
        await fetchAtletas();
      } catch (error) {
        console.error('Error al eliminar atleta:', error);
      }
    };

    const editAtleta = (atleta) => {
      atletaSeleccionado.value = { ...atleta }; 
    };

    const cancelarEdicion = () => {
      atletaSeleccionado.value = null;
    };

    const handleRefresh = () => {
      fetchAtletas();
      atletaSeleccionado.value = null;
    };

    onMounted(() => {
      fetchAtletas();
    });

    return {
      atletas,
      atletaSeleccionado,
      editAtleta,
      deleteAtleta,
      handleRefresh,
      cancelarEdicion
    };
  },
};
</script>
