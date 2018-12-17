
<template>
    <div class="productList">
<el-button type="primary" style=' margin: 50px 35px;'  @click='showAddDialog'>添加商品</el-button>
 <template>
        <el-table
        border
    ref="multipleTable"
    :data="productList"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="商品编号"
      >
    </el-table-column>
    <el-table-column
    width="280"
      prop="proName"
      label="商品名称"
      >
    </el-table-column>
     <el-table-column
      prop="proDesc"
      width="100"
      label="商品描述"
      >
    </el-table-column>
     <el-table-column
      prop="num"
      label="商品库存"
      >
    </el-table-column>
      <el-table-column
      prop="size"
      label="商品尺寸"
      >
    </el-table-column>
      <el-table-column
      label="是否下架"
      >
       <template slot-scope="scope">
              <span>{{scope.row.statu | isDeleteFormat}}</span>
            </template>
    </el-table-column>
     <el-table-column
      prop=""
      label="操作"
      >
         <template slot-scope="scope">
             <!-- <el-switch
                v-model="scope.row"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change='changeUserState(scope.row)'>
                    </el-switch> -->
                    <el-button type="danger" plain>下架</el-button>
            </template>

    </el-table-column>
  </el-table>
       </template>
       <!-- 添加分类对话框 -->
 <el-dialog title="添加商品" :visible.sync="AddFormVisible" >
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
    <el-form-item label="产品名称" >
      <el-input v-model="addform.proName" placeholder="请输入产品名称"></el-input>
    </el-form-item>
     <el-form-item label="产品描述" >
      <el-input v-model="addform.proDesc" placeholder="请输入产品描述"></el-input>
    </el-form-item>
     <el-form-item label="产品数量" >
      <el-input v-model="addform.num" placeholder="请输入产品数量"></el-input>
    </el-form-item>
     <el-form-item label="产品尺寸" >
      <el-input v-model="addform.size" placeholder="请输入产品尺寸"></el-input>
    </el-form-item>
     <el-form-item label="产品原价" >
      <el-input v-model="addform.oldPrice" placeholder="请输入产品原价"></el-input>
    </el-form-item>
     <el-form-item label="产品折扣价" >
      <el-input v-model="addform.price" placeholder="请输入产品折扣价"></el-input>
    </el-form-item>
    <el-form-item>
      <!--  :on-exceed='handleli' :limit='number'-->
       <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/product/addProductPic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              name='pic1'
              list-type="picture"
              :limit='number'
              :before-upload='uploadBeforeValid'
              :file-list="fileList"
              :on-success='uploadDone'
               :with-credentials='cookie'
                size="small"
                type="primary"
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
import {ProductDetail, getcategorySecond, addProduct} from '@/api/index.js'
export default{
  data () {
    return {
      cookie: true,
      number: 3,
      selectedOptions: [],
      catelist: [],
      props: {
        value: 'id',
        label: 'brandName'

      },
      addform: {
        proName: '',
        oldPrice: '',
        price: '',
        proDesc: '',
        size: '',
        statu: '',
        num: '',
        brandId: '',
        picName1: '',
        picName2: '',
        picName3: '',
        picAddr1: '',
        picAddr2: '',
        picAddr3: ''
      },
      AddFormVisible: false,
      productList: [],
      multipleSelection: [],
      page: 1,
      pageSize: 10,
      fileList: []
    }
  },
  // 在el-table中：过渡器只能在插值表达式中使用
  filters: {
    isDeleteFormat (statu) {
      if (statu === 1) {
        return '未下架'
      } else if (statu === 0) {
        return '已下架'
      }
    }
  },
  methods: {
    addUserSubmit () {
      addProduct(this.addform)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '添加角色成功'
            })
            this.init()
            this.AddFormVisible = false
          }
        })
    },
    showAddDialog () {
      this.AddFormVisible = true
      getcategorySecond({ page: this.page, pageSize: this.pageSize }).then(res => {
        console.log(res)
        this.catelist = res.rows
      })
    },
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
      this.addform.brandId = value
    },
    // 图片上传
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
      // this.addform.brandLogo = response.picAddr
      if (fileList.length === 1) {
        this.addform.picName1 = fileList[0].response.picName
        this.addform.picAddr1 = fileList[0].response.picAddr
      }
      if (fileList.length === 2) {
        this.addform.picName1 = fileList[0].response.picName
        this.addform.picAddr1 = fileList[0].response.picAddr
        this.addform.picName2 = fileList[1].response.picName
        this.addform.picAddr2 = fileList[1].response.picAddr
      }
      if (fileList.length === 3) {
        this.addform.picName1 = fileList[0].response.picName
        this.addform.picAddr1 = fileList[0].response.picAddr
        this.addform.picName2 = fileList[1].response.picName
        this.addform.picAddr2 = fileList[1].response.picAddr
        this.addform.picName3 = fileList[2].response.picName
        this.addform.picAddr3 = fileList[2].response.picAddr
      }
    },
    init () {
      ProductDetail({ page: this.page, pageSize: this.pageSize })
        .then(res => {
          console.log(res)
          this.productList = res.rows
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>

</style>
