<template>
  <el-table
    :data="cateList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="img" label="分类图片">
      <template slot-scope="scope">
        <img class="img" :src="$imgBaseUrl + scope.row.img" alt="" />
      </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="abc">
        <el-tag type="success" v-if="abc.row.status == 1" size="small "
          >正常</el-tag
        >
        <el-tag type="warning" size="small " v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="abc">
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="edit(abc.row)"
          size="mini"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="del(abc.row.id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delCate } from "../../request/cate";
export default {
  props: ["info"],
  data() {
    return {};
  },
  created() {
    this.getCateListAction();
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    edit(val) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // 传递父子件数据
      this.$emit("sendData", val);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCate(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getCateListAction();
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {},
};
</script>
<style scoped>
.img {
  width: 100px;
}
</style>