<template>
  <form @submit.prevent="save" class="d-flex gap-2 mb-4">
    <input v-model="nombre" placeholder="Nombre ciudad" required class="form-control" />
    <button type="submit" class="btn btn-primary">
      {{ ciudadEditar ? 'Actualizar' : 'Guardar' }}
    </button>
    <button v-if="ciudadEditar" type="button" @click="cancelar" class="btn btn-secondary">Cancelar</button>
  </form>
</template>

<script>
import { ref, watch } from 'vue';
import { useApi } from '../composables/useApi';

export default {
  props: {
    ciudadEditar: { type: Object, default: null }
  },
  emits: ['refresh', 'cancelarEdicion'],
  setup(props, { emit }) {
    const { post, put } = useApi();
    const nombre = ref('');

    
    watch(() => props.ciudadEditar, (nuevaCiudad) => {
      if (nuevaCiudad) {
        nombre.value = nuevaCiudad.nombre;
      } else {
        nombre.value = '';
      }
    }, { immediate: true });

    const save = async () => {
      try {
        if (props.ciudadEditar) {
          await put(`ciudades/${props.ciudadEditar.id}`, { nombre: nombre.value });
        } else {
          await post('ciudades', { nombre: nombre.value });
        }
        emit('refresh');
        cancelar();
      } catch (error) {
        alert(error.response?.data?.message || 'Error al guardar la ciudad');
      }
    };

    const cancelar = () => {
      nombre.value = '';
      emit('cancelarEdicion');
    };

    return { nombre, save, cancelar };
  },
};
</script>
