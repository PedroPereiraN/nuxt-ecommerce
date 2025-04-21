<script setup lang="ts">
export type Props = {
  placeholder?: string;
  id?: string;
  type?: string;
  maxLength?: string;
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
  <input
    :placeholder="props?.placeholder"
    :id="props?.id"
    :type="props?.type"
    :maxLength="props?.maxLength"
    :disabled="props?.disabled"
    class="py-2 px-4 rounded-lg h-12 bg-gray-100 w-full"
    @input="(e: any) => update(e.target.value)"
  />
</template>
