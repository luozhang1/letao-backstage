<template>
  <div class="categorySecond">
    <el-button
      type="primary"
      style=' margin: 50px 35px;'
       @click='showAddDialog'
    >添加分类</el-button>
    <template>
      <el-table
        border
        ref="multipleTable"
        :data="secondList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="品牌编号"
        >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称"
        >
        </el-table-column>
        <el-table-column label="品牌logo"
         width="180"

        >
          <template slot-scope="scope">
            <img
              :src="'http://127.0.0.1:3000/' + scope.row.brandLogo"
              alt=""
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属分类"
        >
        </el-table-column>
      </el-table>
    </template>
 <!-- 添加分类对话框 -->
 <el-dialog title="添加分类" :visible.sync="AddFormVisible" >
  <el-form :model="addform"   label-width="100px">
     <el-form-item label="父级名称">
     <el-cascader
     :clearable='true'
    expand-trigger="hover"
    :options="catelist"
     v-model="selectedOptions"
        @change="handleChange"
        :props='props'
        >
  </el-cascader>
    </el-form-item>
    <el-form-item label="品牌名称" >
      <el-input v-model="addform.brandName" placeholder="请输入品牌名称"></el-input>
    </el-form-item>
    <el-form-item>
       <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/category/addSecondCategoryPic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
               :before-upload='uploadBeforeValid'
              :file-list="fileList"
              :on-success='uploadDone'
                size="small"
                type="primary"
              name='pic1'
              :with-credentials='cookie'
            >
              <el-button
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
import { getcategorySecond, getcategory, addSecond } from '@/api/index.js'
// import { getcategorySecond, getcategory } from '@/api/index.js'
export default {
  data () {
    return {
      cookie: true,
      selectedOptions: [],
      catelist: [],
      props: {
        value: 'id',
        label: 'categoryName'

      },
      addform: {brandName: '',
        categoryId: '',
        brandLogo: ''
      },
      AddFormVisible: false,
      secondList: [],
      multipleSelection: [],
      page: 1,
      pageSize: 10,
      fileList: []
    }
  },
  methods: {
    // 提交数据
    addUserSubmit () {
      addSecond(this.addform)
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
    showAddDialog () {
      this.AddFormVisible = true
      getcategory({ page: this.page, pageSize: this.pageSize }).then(res => {
        console.log(res)
        this.catelist = res.rows
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
    handleChange (value) {
      this.addform.categoryId = value
    },
    // 图片上传
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    // },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${ file.name }？`);
    // }
    // // 实现文件上传之前的验证
    uploadBeforeValid (file) {
      if (file.size > 500 * 1024) {
        this.$message.warning('图片大小超出指定大小')
        return false
      }
      console.log(file)
    },
    // 文件上传成功
    uploadDone (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.addform.brandLogo = response.picAddr
    },
    initList () {
      getcategorySecond({ page: this.page, pageSize: this.pageSize }).then(
        res => {
          console.log(res)
          this.secondList = res.rows
        })
    }
  },
  mounted () {
    this.initList()
  }
}
</script>
<style lang="scss" scoped>
img{
  width: 100%;
}
</style>
