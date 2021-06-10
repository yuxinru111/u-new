<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类"> </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="scope">
          <img class="img" :src="$imgBaseUrl + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格">
        <template slot-scope="scope"> &yen; {{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template slot-scope="scope">
          &yen; {{ scope.row.market_price }}
        </template>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsCount"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { delGoods } from "../../request/goods";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      goodsCount: (state) => state.goods.goodsCount,
    }),
  },
  created() {
    this.getGoodsListAction(this.params);
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.size = val;
      this.params.page = 1;
      this.getGoodsListAction(this.params);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      this.getGoodsListAction(this.params);
    },
    edit(obj) {
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$emit("sendData", obj);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGoods(id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getGoodsListAction();
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