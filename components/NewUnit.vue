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
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="e.g. Roboute Guiliman, The Silent King, Goregutz, etc."
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
            <a-input
              v-decorator="[
                'Type',
                {
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="e.g Primaris Intercessor, Necron Warrior etc..."
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <label>Division</label>
      </a-row>
      <a-row>
        <a-col span="24">
          <a-form-item>
            <a-input
              v-decorator="[
                'Division',
                {
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="e.g. HQ, Troops, Fast Attack etc..."
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
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="Use this field to add story or narrative elements."
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <label>Power Cost</label>
        </a-col>
        <a-col span="12">
          <label>Points Cost</label>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col span="12">
          <a-form-item>
            <a-input
              v-decorator="[
                'Power',
                {
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="Use this field to add story or narrative elements."
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item>
            <a-input
              v-decorator="[
                'Points',
                {
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="Use this field to add story or narrative elements."
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
                  rules: [
                    { required: true, message: 'Please enter user name' },
                  ],
                },
              ]"
              placeholder="Anything you need to remember about this unit."
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
          <a-button type="primary" @click="handleSubmit">
            Create Unit
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

export default Vue.extend({
  props: ['visible', 'close', 'crusade'],
  data() {
    const name: String = this.name
    const loading: boolean = true
    const factionOptions: String[] = []
    return {
      name,
      loading,
      formLayout: 'horizontal',
      factionOptions,
      hasErrors,
      form: this.$form.createForm(this, { name: 'new_unit' }),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields(async (err: any, values: any) => {
        if (!err) {
          this.$message.loading(`Creating new unit...`)
          try {
            await this.$store.dispatch('ACTION_createNewUnit', {
              fire: this.$fire,
              unit: values,
              crusade: this.crusade,
            })
            this.$message.success(`Unit Created!`)
            setTimeout(() => {
              this.$props.close()
            }, 0)
          } catch (e) {
            console.error(e)
            this.$message.error(`Warp storms have caused this unit to be lost!`)
            this.$store.commit('SET_isLoading', false)
          } finally {
            // Cleanup
          }
        }
      })
    },
  },
})
</script>

<style lang="scss">
.ant-drawer-content-wrapper {
  width: 100% !important;
}

.ant-form-item-control-wrapper {
  width: 100%;
}
.ant-btn-primary {
  width: 100%;
}
</style>
