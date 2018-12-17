<template>
    <div class="categoryFirst">
       <el-button type="primary" style=' margin: 50px 35px;'  @click='showAddDialog' >添加分类</el-button>
   <template>
        <el-table
        border
    :data="categoryList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="分类编号"
      >
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="分类名称"
      >
    </el-table-column>
  </el-table>
       </template>
        <!-- 添加分类对话框 -->
 <el-dialog title="添加分类" :visible.sync="AddFormVisible" >
  <el-form :model="addform"   label-width="100px">
    <el-form-item label="分类名称" >
      <el-input v-model="addform.categoryName" placeholder="请输入分类名称"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="AddFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUserSubmit">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
import {getcategory, getAddcategory} from '@/api/index.js'
export default{
  data () {
    return {
      addform: {categoryName: ''},
      categoryList: [],
      multipleSelection: [],
      page: 1,
      pageSize: 10,
      AddFormVisible: false
    }
  },
  methods: {
    showAddDialog () {
      this.AddFormVisible = true
    },
    addUserSubmit () {
      // console.log(this.addform.categoryName)
      // {categoryName: this.addform.categoryName}
      getAddcategory(this.addform)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '添加角色成功'
            })
            this.initList()
            this.AddFormVisible = false
          }
        })
    },
    // 获取数据
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    initList () {
      getcategory({ page: this.page, pageSize: this.pageSize })
        .then(res => {
          console.log(res)
          this.categoryList = res.rows
        })
    }
  },
  mounted () {
    this.initList()
  }
}
</script>
<style lang="scss" scoped>

</style>
