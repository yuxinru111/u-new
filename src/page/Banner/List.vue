<template>
  <el-table
    :data="bannerList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="id" width="150"> </el-table-column>
    <el-table-column prop="title" label="标题" width="150"> </el-table-column>
    <el-table-column prop="img" label="图片" width="200">
      <template slot-scope="scope">
        <img class="img" :src="$imgBaseUrl + scope.row.img" alt="" />
      </template>
    </el-table-column>
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
import { delBanner } from "../../request/banner";
export default {
  props: ["info"],
  data() {
    return {};
  },
  created() {
    this.getBannerListAction();
  },
  computed: {
    ...mapState({ bannerList: (state) => state.banner.bannerList }),
  },
  methods: {
    ...mapActions("banner", ["getBannerListAction"]),
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
          delBanner(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getBannerListAction();
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