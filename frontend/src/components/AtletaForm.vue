<template>
  <form @submit.prevent="save" class="row g-3 mb-4">
    <div class="col-md-6">
      <input v-model="nombre" class="form-control" placeholder="Nombre" required />
    </div>
    <div class="col-md-6">
      <input v-model.number="dni" type="number" class="form-control" placeholder="DNI" required />
    </div>
    <div class="col-md-6">
      <input v-model="tiempo" class="form-control" placeholder="Tiempo (ej: 2h 07m 30s)" required />
    </div>
    <div class="col-md-6">
      <input v-model.number="posicion" type="number" class="form-control" placeholder="Posición" required min="1" />
    </div>
    <div class="col-md-12">
      <select v-model="ciudadId" class="form-select" required>
        <option value="">Seleccionar ciudad</option>
        <option v-for="c in ciudades" :key="c.id" :value="c.id">{{ c.nombre }}</option>
      </select>
    </div>

    <div class="col-12 d-flex gap-2">
      <button type="submit" class="btn btn-success">
        {{ atletaEditar ? 'Actualizar' : 'Guardar' }}
      </button>
      <button v-if="atletaEditar" type="button" @click="cancelar" class="btn btn-secondary">Cancelar</button>
    </div>
  </form>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useApi } from '../composables/useApi';

export default {
  props: {
    ciudades: { type: Array, required: true },
    atletaEditar: { type: Object, default: null },
  },
  emits: ['refresh', 'cancelarEdicion'],
  setup(props, { emit }) {
    const { post, put } = useApi();

    const id = ref(null);
    const nombre = ref('');
    const dni = ref(null);
    const tiempo = ref('');
    const posicion = ref(null);
    const ciudadId = ref('');

    const resetForm = () => {
      id.value = null;
      nombre.value = '';
      dni.value = null;
      tiempo.value = '';
      posicion.value = null;
      ciudadId.value = '';
    };

    const cargarDatos = (atleta) => {
      id.value = atleta.id;
      nombre.value = atleta.nombre;
      dni.value = atleta.dni;
      tiempo.value = atleta.tiempo;
      posicion.value = atleta.posicion;
      ciudadId.value = atleta.ciudad?.id || '';
    };

    watch(() => props.atletaEditar, (nuevoAtleta) => {
      if (nuevoAtleta) {
        cargarDatos(nuevoAtleta);
      } else {
        resetForm();
      }
    }, { immediate: true });

    const save = async () => {
      try {
        const data = {
          nombre: nombre.value,
          dni: dni.value,
          tiempo: tiempo.value,
          posicion: posicion.value,
          ciudadId: ciudadId.value,
        };

        if (props.atletaEditar) {
          await put(`atletas/${id.value}`, data);
        } else {
          await post('atletas', data);
        }

        emit('refresh');
        resetForm();
      } catch (error) {
        alert(error.response?.data?.message || 'Error al guardar el atleta');
      }
    };

    const cancelar = () => {
      resetForm();
      emit('cancelarEdicion');
    };

    return {
      nombre,
      dni,
      tiempo,
      posicion,
      ciudadId,
      save,
      cancelar,
    };
  },
};
</script>
