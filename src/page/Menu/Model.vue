<template>
  <el-dialog
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    @close="reset"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="类型" label-width="80px" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级" label-width="80px" v-show="form.type == 2">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" label-width="80px" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="地址"
        label-width="80px"
        prop="url"
        v-show="form.type == 2"
      >
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="80px" v-show="form.type == 1">
        <el-input v-model="form.icon" autocomplete="off"></el-input>
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
import { addMenu, editMenu } from "../../request/menu";
import { mapActions, mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      // 输入框离焦显示红色的框
      rules: {
        //   鼠标离焦的状态
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {},
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),

    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            addMenu(this.form).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getMenuListAction();
              }
            });
          } else {
            editMenu(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getMenuListAction();
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
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    sendDate(obj) {
      // 重新拷贝对象重新赋值，防止重复
      this.form = { ...obj };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>