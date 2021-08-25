<template>
  <div class="orderOfBattleRoot">
    <EditUnit
      :key="editingKey"
      :visible="editingUnit"
      :close="onClose"
      :save="save"
      :unit="currentUnit"
    ></EditUnit>
    <a-table :columns="columns" :data-source="tableData" bordered>
      <template slot="title" slot-scope="currentPageData">
        <div class="tableHeader"><h3>Order of Battle</h3></div>
      </template>
      <template slot="footer" slot-scope="currentPageData">
        <div class="tableFooter">
          <a-button
            :disabled="creatingNewRow"
            type="primary"
            shape="circle"
            icon="plus"
            @click="addNew"
          />
        </div>
      </template>
      <template
        v-for="col in ['Name', 'Points', 'Type', '+', 'Deploy']"
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
              title="Discard changes?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >Edit</a
            >
            <a :disabled="editingKey !== ''" @click="() => erase(record.key)"
              >Delete</a
            >
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import EditUnit from '@/components/strongholder/EditUnit.vue'
const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    scopedSlots: { customRender: 'Name' },
  },
  {
    title: 'Points',
    dataIndex: 'Points',
    scopedSlots: { customRender: 'Points' },
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    scopedSlots: { customRender: 'Type' },
  },
  {
    title: '+',
    dataIndex: '+',
    scopedSlots: { customRender: '+' },
  },
  {
    title: 'Deploy',
    dataIndex: 'Deploy',
    scopedSlots: { customRender: 'Deploy' },
  },
  {
    title: '',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
]

export default {
  components: { EditUnit },
  props: ['stronghold'],
  data() {
    this.cacheData = this.stronghold.OrderOfBattle.map((item) => ({ ...item }))
    return {
      editingKey: '',
      creatingNewRow: false,
      columns,
      tableData: this.stronghold.OrderOfBattle.map((item) => ({ ...item })),
      currentUnit: {},
      editingUnit: false,
    }
  },
  methods: {
    showDrawer(key, unit) {
      this.editingKey = key
      this.editingUnit = true
      this.currentUnit = unit
    },
    onClose() {
      this.editingKey = ''
      this.editingUnit = false
      this.currentUnit = {}
    },
    handleChange(value, key, column) {
      const newData = [...this.tableData]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.tableData = newData
      }
    },
    edit(key) {
      const newData = [...this.tableData]
      const target = newData.filter((item) => key === item.key)[0]
      this.editingKey = key
      this.showDrawer(key, target)
    },
    async save(values) {
      try {
        const newData = [...this.tableData]
        const newCacheData = [...this.cacheData]
        const target = newData.filter((item) => this.editingKey === item.key)[0]
        const targetCache = newCacheData.filter(
          (item) => this.editingKey === item.key
        )[0]

        console.log(this.editingKey)
        console.log(target)
        console.log(values)

        values.key = values.Name
        Object.assign(target, { ...values })
        if (target.key === 'New Row') {
          this.$message.error(`Please give your row a different name`)
          return false
        }
        if (target && targetCache) {
          delete target.editable
          this.tableData = newData
          Object.assign(targetCache, target)
          this.cacheData = newCacheData
        }
        this.editingKey = ''
        this.creatingNewRow = false
        this.currentUnit = {}
        this.editingUnit = false
        await this.$store.dispatch('ACTION_saveOOB', {
          stronghold: this.stronghold,
          OOB: this.tableData,
        })
        this.$message.success(`Stronghold Changes Saved!`)
      } catch (e) {
        console.error(e)
        this.$message.error(
          `Unable to update Order of Battle! I blame goblins.`
        )
      }
    },
    addNew() {
      const target = {
        key: 'New Row',
        Name: 'New Row',
        Points: 0,
        Type: 'None',
        '+': 0,
        Deploy: false,
        editable: true,
      }
      const newData = [...this.tableData]
      const newCacheData = [...this.cacheData]
      newData.push(target)
      newCacheData.push(target)
      this.creatingNewRow = target.key
      this.editingKey = target.key
      this.tableData = newData
      this.cacheData = newCacheData
    },
    async erase(key) {
      const newData = [...this.tableData]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.key)[0]
      const cacheTarget = newCacheData.filter((item) => key === item.key)[0]
      const deleteIndex = _.findIndex(newData, { key: target.key })
      const deleteCacheIndex = _.findIndex(newCacheData, { key: target.key })
      newData.splice(deleteIndex, 1)
      newCacheData.splice(deleteCacheIndex, 1)
      this.cacheData = newCacheData
      this.tableData = newData

      try {
        await this.$store.dispatch('ACTION_saveOOB', {
          stronghold: this.stronghold,
          OOB: this.tableData,
        })
        this.$message.success(`Unit Deleted!`)
      } catch (e) {
        console.error(e)
        this.$message.error(`Unable to update unit! I blame goblins.`)
      }
    },
    cancel(key) {
      const newData = [...this.tableData]
      const newCacheData = [...this.cacheData]
      const target = newData.filter((item) => key === item.key)[0]
      const cacheTarget = newCacheData.filter((item) => key === item.key)[0]
      this.editingKey = ''

      if (
        target &&
        target.key !== 'New Row' &&
        this.creatingNewRow !== target.key
      ) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        )
        delete target.editable
        this.tableData = newData
      }
      if (target.key === 'New Row' || this.creatingNewRow === target.key) {
        // Delete
        const deleteIndex = _.findIndex(newData, { key: target.key })
        const deleteCacheIndex = _.findIndex(newCacheData, { key: target.key })
        newData.splice(deleteIndex, 1)
        newCacheData.splice(deleteCacheIndex, 1)
        this.cacheData = newCacheData
        this.tableData = newData
        this.creatingNewRow = false
      }
    },
  },
}
</script>

<style lang="scss">
.editable-row-operations a {
  margin-right: 8px;
}
thead {
  th {
    background-color: #e0e0e0 !important;
    span.ant-table-column-title {
      font-family: 'Conduit itc', sans-serif;
      font-size: 18px;
    }
  }
}
tbody {
  tr.ant-table-row {
    td {
      background-color: #303030 !important;
      div {
        font-size: 16px;
        padding: 10px;
      }
    }
  }
  tr.ant-table-row:hover {
    td {
      background-color: #606060 !important;
    }
  }
}
.tableFooter {
  button {
    float: right;
    margin-left: auto;
  }
}
</style>
