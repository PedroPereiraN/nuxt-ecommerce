<script setup lang="ts">
export type Props = {
  placeholder?: string;
  disabled?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const model = defineModel();

function update(value: string | undefined) {
  model.value = value;
}
</script>

<template>
  <textarea
    :placeholder="props?.placeholder"
    :disabled="props?.disabled"
    class="p-4 rounded-lg bg-gray-100"
    @input="(e: any) => update(e.target.value)"
  />
</template>
