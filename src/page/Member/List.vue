<template>
  <div>
    <el-table
      :data="memberList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>

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
            @click="del()"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
import { mapState, mapActions } from "vuex";
import { Message } from "element-ui";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      memberList: (state) => state.member.memberList,
    }),
  },
  created() {
    this.getMemberListAction();
    console.log(this.memberList);
  },
  methods: {
    ...mapActions("member", ["getMemberListAction"]),
    del() {
      Message({
        message: "暂不能删除",
        type: "error",
      });
    },
    edit() {
      Message({
        message: "暂不能编辑",
        type: "success",
      });
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