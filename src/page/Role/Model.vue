<template>
  <el-dialog
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    @close="reset"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="角色名称" label-width="80px" prop="rolename">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" label-width="80px" prop="menus">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
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
import { mapState, mapActions } from "vuex";
import { addRole, editRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",

        status: 1,
      },
      rules: {
        //   鼠标离焦的状态
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    ...mapActions("role", ["getRoleListAction"]),
    reset() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //    单独清空
      this.$refs.tree.setCheckedKeys([]);
    },
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //  单独获取，单独赋值

          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
          if (this.info.isAdd) {
            addRole(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getRoleListAction();
              }
            });
          } else {
            editRole(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.info.isShow = false;
                this.getRoleListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendData(obj) {
      this.form = { ...obj };
      //   单独设置
      //   当视图dom全部更新完之后在执行内部代码
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.form.menus.split(","));
      });
      //   以下第2种写法
      //   setTimeout(()=>{
      //        this.$refs.tree.setCheckedKeys(this.form.menu.split(","));
      //   },100)
    },
  },
  components: {},
};
</script>
<style scoped>
</style>