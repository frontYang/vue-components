<template>
  <el-table
    :data="tableData"
    border
    width="100%"
    row-key="id"
    align="left"
  >
    <el-table-column
      width="60px"
      label="序号"
      type="index"
    />
    <el-table-column
      v-for="(item, index) in col"
      :key="`col_${index}`"
      :prop="dropCol[index].prop"
      :label="item.label"
    />
    <el-table-column label="操作" min-width="100">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >
          修改
        </el-button>
        <el-popover v-model="scope.row.visible" placement="top">
          <p>确定要删除当前内容？</p>
          <div style="text-align: right; margin: 0;">
            <el-button size="mini" plain @click="scope.row.visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row), scope.row.visible = false">确定</el-button>
          </div>
          <el-button
            slot="reference"
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      col: [
        {
          label: '值',
          prop: 'dataKey'
        },
        {
          label: '显示名',
          prop: 'dataValue'
        }
      ],
      dropCol: [
        {
          label: '值',
          prop: 'dataKey'
        },
        {
          label: '显示名',
          prop: 'dataValue'
        }
      ],
      tableData: [
        {
          dataKey: 'sdfsdf',
          dataValue: '1111'
        },
        {
          dataKey: 'sdfsdf',
          dataValue: '2222'
        },
        {
          dataKey: 'sdfsdf',
          dataValue: '3333'
        }
      ]
    }
  },
  mounted() {
    this.rowDrop()
    // this.columnDrop()
  },
  methods: {
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody, {
        onEnd: ({ newIndex, oldIndex }) => {
          const currRow = this.tableData.splice(oldIndex, 1)[0]
          this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    }
  }
}
</script>
