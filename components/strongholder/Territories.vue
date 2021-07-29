<template>
  <div class="territoriesRoot">
    <a-table :columns="columns" :data-source="data">
      <template
        v-for="col in ['name', 'size', 'upgrades']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Discard Changes?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >Edit</a
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Size & Type',
    dataIndex: 'Size & Type',
    scopedSlots: { customRender: 'size' },
  },
  {
    title: 'Upgrades',
    dataIndex: 'Upgrades',
    scopedSlots: { customRender: 'upgrades' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
]

const data = []
data.push({
  Name: 'Balor Lowlands',
  'Size & Type': 'Old Keep',
  Upgrades: 'None',
})
export default {
  props: ['territories'],
  data() {
    this.cacheData = data.map((item) => ({ ...item }))
    return {
      editingKey: '',
      columns,
      data,
    }
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.key)[0]
      const targetCache = newCacheData.filter((item) => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = ''
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        )
        delete target.editable
        this.data = newData
      }
    },
  },
}
</script>

<style lang="scss">
.editable-row-operations a {
  margin-right: 8px;
}
</style>
