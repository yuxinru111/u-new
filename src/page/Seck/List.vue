<template>
  <div>
    <el-table
      :data="seckList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="begintime" label="开始时间" width="250">
      </el-table-column>
      <el-table-column prop="endtime" label="结束时间" width="250">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>禁用</el-tag>
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
  </div>
</template> 

<script>
import { mapState, mapActions } from "vuex";
import { delSeck } from "../../request/seck";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      seckList: (state) => state.seck.seckList,
      seckCount: (state) => state.seck.seckCount,
    }),
  },
  created() {
    this.getSeckListAction();
  },
  methods: {
    ...mapActions("seck", ["getSeckListAction"]),
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSeck(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getSeckListAction();
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
    edit(obj) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$emit("sendData", obj);
    },
  },
  components: {},
};
</script>
<style scoped>
.attr {
  margin-right: 5px;
}
</style>