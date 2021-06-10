<template>
  <el-dialog
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    @close="reset"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="图片名称" label-width="80px" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 分类图片 -->
      <el-form-item label="图片" label-width="80px" prop="img">
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="change"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" label-width="80px" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBanner, editBanner } from "../../request/banner";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      // 输入框离焦显示红色的框
      rules: {
        //   鼠标离焦的状态
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],

        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapState({ bannerList: (state) => state.banner.bannerList }),
  },
  created() {},
  methods: {
    ...mapActions("banner", ["getBannerListAction"]),

    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          let fd = new FormData();
          for (let k in this.form) {
            fd.append(k, this.form[k]);
          }
          if (this.info.isAdd) {
            addBanner(fd).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getBannerListAction();
              }
            });
          } else {
            editBanner(fd).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getBannerListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
    sendData(obj) {
      // 重新拷贝对象重新赋值，防止重复
      this.form = { ...obj };
      this.imageUrl = this.$imgBaseUrl + this.form.img;
    },
    change(res, file) {
      // console.log(res)
      // console.log(file)
      // URL.createObjectURL 把文件对象转换为可显示的地址
      this.imageUrl = URL.createObjectURL(res.raw);
      this.form.img = res.raw;
    },
  },
  components: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #409eff;
  border-radius: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>