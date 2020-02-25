<template>
  <taskContainer title="员工列表" btn-title="新增员工" @taskBtnMethod="openUser">
    <Row>
      <Form :label-width="80">
        <Col span="4">
          <FormItem label="员工姓名">
            <Input v-model="searchData.name" />
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="员工类别">
            <Select v-model="searchData.fiveCategories">
              <Option value>全部</Option>
              <Option value="1">"五类"人员</Option>
              <Option value="2">"非五类"人员</Option>
              <Option value="3">现居湖北等疫情高发病区</Option>
              <Option value="4">14天内有过病例接触史</Option>
              <Option value="5">14天内有过湖北或其他有本地病例持续传播地区旅居史</Option>
              <Option value="6">14天内有过与湖北等疫情高发地区人员接触史</Option>
              <Option value="7">14天内自身有疑似症状</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2" offset="1">
          <Button @click="getWorkerList">搜索</Button>
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
    <Modal :title="addTitle" v-model="isAdd" :mask-closable="false">
      <Row>
        <Form ref="userform" :model="userData" :rules="ruleValidate">
          <Col span="24">
            <FormItem label="姓名" prop="name">
              <Input v-model="userData.name" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="性       别" prop="sex">
              <RadioGroup v-model="userData.sex">
                <Radio label="1">
                  <span>男</span>
                </Radio>
                <Radio label="2">
                  <span>女</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="年       龄" prop="age">
              <Input v-model="userData.age" />
            </FormItem>
          </Col>
          <Col span="24" v-show="addTitle=='新增员工'">
            <FormItem label="联系电话" prop="phone">
              <Input v-model="userData.phone" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="身   份 证" prop="idCard">
              <Input v-model="userData.idCard" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="成都市现居地址" prop="address">
              <Input v-model="userData.address" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="现居湖北等疫情高发病区" prop="ncovAddress">
              <RadioGroup v-model="userData.ncovAddress">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="14天内有过病例接触史" prop="recentHistoryContact">
              <RadioGroup v-model="userData.recentHistoryContact">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="14天内有过湖北或其他本地病例持续传播旅游史" prop="ncovDwell">
              <RadioGroup v-model="userData.ncovDwell">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="14天内有过与湖北等疫情高发地区人员接触史" prop="ncovContact">
              <RadioGroup v-model="userData.ncovContact">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="14天内自身有疑似症状" prop="suspectedDisease">
              <RadioGroup v-model="userData.suspectedDisease">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="拟返岗复工时间" prop="repriseTime">
              <DatePicker
                type="date"
                v-model="userData.repriseTime"
                format="yyyy-MM-dd"
                :options="options3"
                @on-change="getDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="身体状况（体温）" prop="animalHeat">
              <Input v-model="userData.animalHeat" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="是否已在社区登记，如有请填报登记时间、社区所在地和社区" prop="communityInfo">
              <Input v-model="userData.communityInfo" />
            </FormItem>
          </Col>
        </Form>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="addUser">提交</Button>
        <Button @click="cancelAdd">取消</Button>
      </div>
    </Modal>
  </taskContainer>
</template>

<script>
import taskContainer from "@/components/taskComponents/TaskContainer";
import store from "@/utils/store";
import _ from 'loadsh';
const companyApi = require(`@/api/company`).default;
export default {
  name: "AppMain",
  data() {
    return {
      store,
      isAdd: false,
      addTitle: "新增员工",
      tableCol: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "性别",
          key: "sex",
          render: (h, params) => {
            let sexName = params.row.sex == 1 ? "男" : "女";
            return h("span", {}, sexName);
          }
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "身份证号码",
          key: "idCard"
        },
        {
          title: "所属行业",
          key: "deptName"
        },
        {
          title: "成都市现居地址",
          key: "address"
        },
        {
          title: "现居湖北等疫情高发病区",
          render: (h, params) => {
            let sexName = params.row.ncovAddress == 1 ? "是" : "否";
            return h("span", {}, sexName);
          }
        },
        {
          title: "14天内有过病例接触史",
          render: (h, params) => {
            let sexName = params.row.recentHistoryContact == 1 ? "是" : "否";
            return h("span", {}, sexName);
          }
        },
        {
          title: "14天内有过湖北或其他有本地病例持续传播地区旅居史",
          render: (h, params) => {
            let sexName = params.row.ncovDwell == 1 ? "是" : "否";
            return h("span", {}, sexName);
          }
        },
        {
          title: "14天内有过与湖北等疫情高发地区人员接触史",
          render: (h, params) => {
            let sexName = params.row.ncovContact == 1 ? "是" : "否";
            return h("span", {}, sexName);
          }
        },
        {
          title: "14天内自身有疑似症状",
          render: (h, params) => {
            let sexName = params.row.suspectedDisease == 1 ? "是" : "否";
            return h("span", {}, sexName);
          }
        },
        {
          title: "拟返岗复工时间",
          key: "repriseTime"
        },
        {
          title: "身体状况（体温)",
          key: "animalHeat"
        },
        {
          title:
            "是否已在社区登记，如有请填报登记时间、社区所在地和社区具体名称",
          key: "communityInfo"
        },
        {
          title: "操作",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.addTitle = "修改员工";
                      this.userData.id = params.row.id;
                      this.isAdd = true;
                      this.userData = _.cloneDeep(params.row);
                      this.userData.ncovAddress = this.userData.ncovAddress.toString();
                      this.userData.sex = this.userData.sex.toString();
                      this.userData.recentHistoryContact = this.userData.recentHistoryContact.toString();
                      this.userData.ncovDwell = this.userData.ncovDwell.toString();
                      this.userData.ncovContact = this.userData.ncovContact.toString();
                      this.userData.suspectedDisease = this.userData.suspectedDisease.toString();
                      this.userData.animalHeat = this.userData.animalHeat.toString();
                      this.userData.age = this.userData.age.toString();
                    }
                  }
                },
                "修改"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#ff0000",
                    cursor: "pointer",
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      searchData: {
        realId: "",
        name: "",
        fiveCategories: "",
        current: 1,
        size: 10
      },
      total: 0,
      userData: {
        id: "",
        userId: "",
        name: "",
        age: "",
        sex: "",
        phone: "",
        idCard: "",
        address: "",
        ncovAddress: "",
        recentHistoryContact: "",
        ncovDwell: "",
        ncovContact: "",
        suspectedDisease: "",
        repriseTime: "",
        animalHeat: "",
        communityInfo: "",
        deptId: "",
        deptName: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ],
        ncovAddress: [
          {
            required: true,
            message: "请选择是否先居湖北等疫情高发地区",
            trigger: "change"
          }
        ],
        recentHistoryContact: [
          {
            required: true,
            message: "请选择14天内有无病史接触史",
            trigger: "change"
          }
        ],
        ncovDwell: [
          {
            required: true,
            message: "请选择是否14天内有无湖北或其他地病列持续传播地区旅居史",
            trigger: "change"
          }
        ],
        ncovContact: [
          {
            required: true,
            message: "请选择是否14天内有无湖北等疫情高发地区人员接触史",
            trigger: "change"
          }
        ],
        suspectedDisease: [
          {
            required: true,
            message: "请选择是否14天内自身有无疑似症状",
            trigger: "change"
          }
        ],
        repriseTime: [
          {
            required: true,
            message: "请填写拟复工时间",
            trigger: "change",
            pattern: /.+/
          }
        ],
        animalHeat: [
          {
            required: true,
            message: "请填写体温",
            trigger: "blur"
          }
        ]
      },
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  created() {
    this.searchData.realId = this.$store.state.user.userInfo.deptId;
    this.userData.deptId = this.$store.state.user.userInfo.deptId;
    this.userData.deptName = this.$store.state.user.userInfo.deptName;
    this.getWorkerList();
  },
  components: {
    taskContainer
  },
  inject: ["reload"],
  methods: {
    handlePage(page) {
      this.searchData.current = page;
      this.getWorkerList();
    },
    handlePageSize(size) {
      this.searchData.size = size;
      this.getWorkerList();
    },
    getDate(val) {
      this.userData.repriseTime = val;
    },
    getWorkerList() {
      companyApi.workerList(this.searchData).then(res => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    openUser() {
      this.addTitle = "新增员工";
      this.isAdd = true;
    },
    cancelAdd() {
      this.isAdd = false;
      this.reload();
    },
    addUser() {
      if (this.addTitle == "新增员工") {
        this.userData.id = "";
        this.userData.userId = this.store.get("userInfo").userId;
        this.$refs.userform.validate(valid => {
          if (valid) {
            companyApi
              .addWorker(this.userData)
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
        this.userData.userId = "";
        this.$refs.userform.validate(valid => {
          if (valid) {
            companyApi
              .editWorker(this.userData)
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
    },
    deleteUser(ids) {
      this.$Modal.info({
        title: "确认删除该员工？",
        onOk: () => {
          companyApi
            .delWorker({
              id: ids
            })
            .then(res => {
              this.$Message.success("删除成功");
              this.reload();
            })
            .catch(err => {
              this.$Message.info(err.response.data.message);
            });
        }
      });
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
