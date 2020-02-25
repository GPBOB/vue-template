<template>
  <taskContainer title="隐患上报" btn-title="新增隐患" @taskBtnMethod="openHidden">
    <Row>
      <Form :label-width="80">
        <Col span="4">
          <FormItem label="日期范围">
            <DatePicker type="daterange" format="yyyy-MM-dd" @on-change="getDate"></DatePicker>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="隐患等级">
            <Select v-model="searchData.hiddenDangerLevel">
              <Option value>全部</Option>
              <Option value="3">重大隐患</Option>
              <Option value="2">较大隐患</Option>
              <Option value="1">一般隐患</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="整改完成情况" :label-width="120">
            <Select v-model="searchData.completeStatus">
              <Option value>全部</Option>
              <Option value="2">已完成</Option>
              <Option value="0">未开始</Option>
              <Option value="1">整改中</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2" offset="1">
          <Button @click="getTroubleList">搜索</Button>
        </Col>
      </Form>
    </Row>
    <Table border :columns="tableCol" :data="tableData"></Table>
    <Page
      class="task_page"
      :total="total"
      :current="searchData.current"
      :page-size="searchData.size"
      size="small"
      show-elevator
      show-sizer
      show-total
      @on-change="handlePage"
      @on-page-size-change="handlePageSize"
    />
    <Modal :title="addtitle" v-model="isAdd" @on-cancel="cancelAdd" :mask-closable="false">
      <Form ref="troubleForm" :model="troubleData" :rules="troubleRule">
        <FormItem label="检查日期" prop="checkDate" v-show="addtitle=='新增隐患'">
          <DatePicker
            type="date"
            v-model="troubleData.checkDate"
            @change="getTdate"
            format="yyyy-MM-dd"
          ></DatePicker>
        </FormItem>
        <FormItem label="隐患情况" prop="hiddenDangerDetail" v-show="addtitle=='新增隐患'">
          <Input type="textarea" v-model="troubleData.hiddenDangerDetail" />
        </FormItem>
        <FormItem label="隐患等级" prop="hiddenDangerLevel" v-show="addtitle=='新增隐患'">
          <Select v-model="troubleData.hiddenDangerLevel">
            <Option value="3">重大隐患</Option>
            <Option value="2">较大隐患</Option>
            <Option value="1">一般隐患</Option>
          </Select>
        </FormItem>
        <FormItem label="整改措施" prop="correctionMeasures" v-show="addtitle=='新增隐患'">
          <Input type="textarea" v-model="troubleData.correctionMeasures" />
        </FormItem>
        <FormItem label="整改整改情况" prop="completeStatus">
          <Select v-model="troubleData.completeStatus">
            <Option value="2">已完成</Option>
            <Option value="0">未开始</Option>
            <Option value="1">整改中</Option>
          </Select>
        </FormItem>
        <FormItem label="上报情况" prop="reportDetail">
          <Input type="textarea" v-model="troubleData.reportDetail" />
        </FormItem>
        <FormItem label="备注">
          <Input type="textarea" v-model="troubleData.remark" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="addTrouble">提交</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
  </taskContainer>
</template>

<script>
import taskContainer from "@/components/taskComponents/TaskContainer";
import config from "@/config";
import downFile from "@/assets/js/commenTask";
import _ from "loadsh"
const companyApi = require(`@/api/company`).default;
export default {
  name: "AppMain",
  data() {
    return {
      config,
      downFile,
      isAdd: false,
      addtitle: "新增隐患",
      tableCol: [
        {
          title: "序号",
          type: "index",
          width: 70
        },
        {
          title: "检查日期",
          key: "checkDate"
        },
        {
          title: "隐患情况",
          key: "hiddenDangerDetail",
          tooltip: true
        },
        {
          title: "隐患等级",
          key: "hiddenDangerLevel",
          render: (h, params) => {
            let isScaleName =
              params.row.hiddenDangerLevel == 1
                ? "一般"
                : params.row.hiddenDangerLevel == 2
                ? "较大"
                : "重大";
            return h(
              "span",
              {
                style: {
                  color:
                    params.row.hiddenDangerLevel == 1
                      ? "#A1A1A1"
                      : params.row.hiddenDangerLevel == 2
                      ? "#FF9933"
                      : "#FF0000"
                }
              },
              isScaleName
            );
          }
        },
        {
          title: "整改措施",
          key: "correctionMeasures",
          tooltip: true
        },
        {
          title: "整改完成情况",
          render: (h, params) => {
            let isScaleName =
              params.row.completeStatus == 1
                ? "整改中"
                : params.row.completeStatus == 0
                ? "未开始"
                : "已完成";
            return h(
              "span",
              {
                style: {
                  color:
                    params.row.completeStatus == 1
                      ? "#FF9933"
                      : params.row.completeStatus == 0
                      ? "#FF0000"
                      : "#009999"
                }
              },
              isScaleName
            );
          }
        },
        {
          title: "上报情况",
          key: "reportDetail",
          tooltip: true
        },
        {
          title: "备注",
          key: "remark",
          tooltip: true
        },
        {
          title: "操作",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  color: "#009999"
                },
                on: {
                  click: () => {
                    this.isAdd = true;
                    this.addtitle = "修改隐患";
                    this.hiddenDangerId = params.row.hiddenDangerId;
                    this.troubleData = _.cloneDeep(params.row);
                    this.troubleData.completeStatus = params.row.completeStatus.toString();
                    this.troubleData.hiddenDangerLevel = params.row.hiddenDangerLevel.toString();
                  }
                }
              },
              "修改"
            );
          }
        }
      ],
      tableData: [],
      searchData: {
        enterpriseId: "",
        checkStartDate: "",
        checkEndDate: "",
        hiddenDangerLevel: "",
        completeStatus: "",
        current: 1,
        size: 10
      },
      total: 0,
      troubleData: {
        enterpriseId: "",
        checkDate: "",
        completeStatus: "",
        correctionMeasures: "",
        hiddenDangerDetail: "",
        hiddenDangerLevel: "",
        reportDetail: "",
        remark: ""
      },
      troubleRule: {
        completeStatus: [
          {
            required: true,
            message: "请选择整改完成情况",
            trigger: "change"
          }
        ],
        checkDate: [
          {
            required: true,
            message: "请选择检查日期",
            trigger: "change",
            pattern: /.+/
          }
        ],
        hiddenDangerLevel: [
          {
            required: true,
            message: "请选择隐患等级",
            trigger: "change"
          }
        ],
        correctionMeasures: [
          {
            required: true,
            message: "请填写整改措施",
            trigger: "blur"
          }
        ],
        hiddenDangerDetail: [
          {
            required: true,
            message: "请填写隐患情况",
            trigger: "blur"
          }
        ],
        reportDetail: [
          {
            required: true,
            message: "请填写上报情况",
            trigger: "blur"
          }
        ]
      },
      hiddenDangerId: ""
    };
  },
  created() {
    this.searchData.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.getTroubleList();
  },
  components: {
    taskContainer
  },
  inject: ["reload"],
  methods: {
    getDate(val) {
      this.searchData.checkStartDate = val[0];
      this.searchData.checkEndDate = val[1];
    },
    getTdate(val) {
      this.troubleData.checkDate = val;
    },
    handlePage(page) {
      this.searchData.current = page;
      this.getTroubleList();
    },
    handlePageSize(size) {
      this.searchData.size = size;
      this.getTroubleList();
    },
    openHidden() {
      this.isAdd = true;
    },
    formatDate(date, format) {
      if (!date) return;
      if (!format) format = "yyyy-MM-dd";
      switch (typeof date) {
        case "string":
          date = new Date(date.replace(/-/, "/"));
          break;
        case "number":
          date = new Date(date);
          break;
      }
      if (!date instanceof Date) return;
      var dict = {
        yyyy: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        MM: ("" + (date.getMonth() + 101)).substr(1),
        dd: ("" + (date.getDate() + 100)).substr(1),
        HH: ("" + (date.getHours() + 100)).substr(1),
        mm: ("" + (date.getMinutes() + 100)).substr(1),
        ss: ("" + (date.getSeconds() + 100)).substr(1)
      };
      return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
      });
    },

    getTroubleList() {
      companyApi.troubleList(this.searchData).then(res => {
        this.tableData = res.data.data.records;
        this.tableData.map(el=>{
          el.checkDate=downFile.formatDate(el.checkDate)
        })
        this.total = res.data.data.total;
      });
    },
    cancelAdd() {
      this.reload();
    },
    addTrouble() {
      this.troubleData.enterpriseId = this.$store.state.user.userInfo.deptId;
      if (this.addtitle == "新增隐患") {
        this.troubleData.checkDate = this.formatDate(
          this.troubleData.checkDate,
          "yyyy-MM-dd"
        );
        this.$refs.troubleForm.validate(valid => {
          if (valid) {
            companyApi
              .addTrouble({ ...this.troubleData })
              .then(res => {
                this.$Message.success("添加成功");
                this.reload();
              })
              .catch(err => {
                this.$Message.info(err.response.data.message);
              });
          } else {
            this.$Message.info("请添加必选项");
          }
        });
      } else {
        this.$refs.troubleForm.validate(valid => {
          if (valid) {
            companyApi
              .editTrouble({
                hiddenDangerId: this.hiddenDangerId,
                ...this.troubleData
              })
              .then(res => {
                this.$Message.success("修改成功");
                this.reload();
              })
              .catch(err => {
                this.$Message.info(err.response.data.message);
              });
          } else {
            this.$Message.info("请添加必选项");
          }
        });
      }
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  .topBar {
    width: 100%;
    height: 80px;
    color: aqua;
    background-color: #444;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sysName {
      margin-left: 20px;
      span {
        font-size: 24px;
      }
    }
    .userExit {
      margin-right: 20px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
