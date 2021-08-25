<template>
  <a-drawer
    title="New Unit"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    class="light"
    @close="close"
  >
    <a-form :form="form" layout="" hide-required-mark>
      <a-row>
        <label>Unit Name:</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Name',
                {
                  initialValue: unit.Name,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Unit Type</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-select
              v-decorator="[
                'Type',
                {
                  initialValue: unit.Type,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            >
              <a-select-option
                v-for="(item, key) in unitTypes"
                :key="key"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Category',
                {
                  initialValue: unit.Type,
                  rules: [
                    { required: true, message: 'Please enter a category' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Background and Story</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Fluff',
                {
                  rules: [
                    { required: false, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="8">
          <label>Points Cost</label>
        </a-col>
        <a-col span="8">
          <label>Reinforced Cost</label>
        </a-col>
        <a-col span="8">
          <label>Renown</label>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Points Cost',
                {
                  initialValue: unit['Points Cost'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Reinforced',
                {
                  initialValue: unit['Reinforced'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Renown',
                {
                  initialValue: unit['Renown'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="8">
          <label>Battles</label>
        </a-col>
        <a-col span="8">
          <label>Kills</label>
        </a-col>
        <a-col span="8">
          <label>Defeats</label>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Battles',
                {
                  initialValue: unit['Battles'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Kills',
                {
                  initialValue: unit['Kills'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item>
            <a-input
              v-decorator="[
                'Defeats',
                {
                  initialValue: unit['Defeats'] || 0,
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Enhancements</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Enhancements',
                {
                  initialValue: unit['Enhancements'],
                  rules: [
                    { required: false, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Veteran Upgrades</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Veteran Upgrades',
                {
                  initialValue: unit['Veteran Upgrades'],
                  rules: [
                    { required: false, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Additional Notes</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Notes',
                {
                  initialValue: unit['Notes'],
                  rules: [
                    { required: false, message: 'Please enter user name' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          padding: '10px 16px',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-col span="24">
          <a-button type="primary" @click="handleSubmit"> Save </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import CONSTANTS from '@/store/constants/crusader'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

export default Vue.extend({
  props: ['visible', 'close', 'unit', 'save', 'key'],
  data() {
    const loading: boolean = true
    return {
      loading,
      unitTypes: CONSTANTS.UNIT_TYPES,
      formLayout: 'horizontal',
      hasErrors,
      form: this.$form.createForm(this, { name: 'new_unit' }),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          this.save(values)
        }
      })
    },
  },
})
</script>

<style scoped lang="scss">
.ant-form-item-control-wrapper {
  width: 100%;
}
.ant-btn-primary {
  width: 100%;
}
</style>
