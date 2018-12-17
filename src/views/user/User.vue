<template>
  <div class="user">
    <template>
      <div class="users">
        <el-table
          :data='userList'
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="280"
          >

          </el-table-column>

          <el-table-column
            prop="mobile"
            label="电话"
            width="340"
          >

          </el-table-column>
          <el-table-column
          prop="isDelete"
            label="状态"
            width="280"
          >
            <template slot-scope="scope">
              <span>{{scope.row.isDelete | isDeleteFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.stop"
               :active-value='tree'
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change='changeUserState($event,scope.row)'>
                    </el-switch>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>
<script>
import { getUser, getupdate } from '@/api/index.js'
export default {
  data () {
    return {
      tree: true,
      userList: [],
      page: 1,
      pageSize: 2
    }
  },
  // 在el-table中：过渡器只能在插值表达式中使用
  filters: {
    isDeleteFormat (isDelete) {
      if (isDelete === 0) {
        return '未启用'
      } else if (isDelete === 1) {
        return '已启用'
      }
      return isDelete
    }
  },
  methods: {
    changeUserState ($event, row) {
      console.log($event)
      console.log(row)
      this.isDelete = !row.isDelete
      getupdate({id: row.id, isDelete: this.isDelete ? 1 : 0})
        .then(res => {
          // console.log(res)
          row.isDelete = this.isDelete ? 1 : 0
          this.$message.success('修改成功')
        })
    },
    // 加载用户列表数据
    init () {
      getUser({ page: this.page, pageSize: this.pageSize }).then(res => {
        // console.log(res)
        this.userList = res.rows
        console.log(res.rows)
      })
    }
    // changeUserState (row) {
    //   console.log(row)
    // }
  },

  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.users {
  margin: 30px 25px;
}
</style>
