<script setup lang="ts">
import DatePicker from "~/components/ui/DatePicker.vue";
import Input from "~/components/ui/Input.vue";
import SelectItem from "~/components/ui/SelectItem.vue";
import Select from "~/components/ui/Select.vue";
import Checkbox from "~/components/ui/Checkbox.vue";
import Switch from "@/components/ui/Switch.vue";
import RadioGroup from "~/components/ui/RadioGroup.vue";
import Dropdown from "~/components/ui/Dropdown.vue";
import { ref } from "vue";

const value = ref("1");
</script>

<template>
  <div class="grid gap-4 grid-cols-3 m-10">
    <DatePicker id="date" />
    <Input />
    <Select placeholderIcon="lucide:chevron-up" placeholder="test">
      <SelectItem value="1"> 1 </SelectItem>

      <SelectItem value="2"> 2 </SelectItem>
    </Select>
    <Checkbox />
    <Switch />
    <RadioGroup
      :items="[
        { value: '2', id: 'd' },
        { value: '3', id: 'a' },
      ]"
    />
  </div>
</template>
