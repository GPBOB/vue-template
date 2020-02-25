<template>
  <taskContainer title="统计分析" :isShade="true">
    <Row>
      <Col span="11">
        <div class="staticCard">
          <p class="staticTitle">人员统计</p>
          <Row class="staticCardItem" style="margin-top:20px">
            <Col span="12">
              <p class="staticNum">{{presona.total}}</p>
              <p class="staticType">总员工</p>
            </Col>
            <Col span="12">
              <p class="staticNum">{{presona.fiveCategoriesNum}}</p>
              <p class="staticType">五类员工</p>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span="11" offset="1">
        <div class="staticCard">
          <p class="staticTitle">
            人员情况
            <DatePicker type="date" v-model="dates" format="yyyy-MM-dd" @on-change="getDate"></DatePicker>
          </p>
          <Row class="staticCardItem" style="margin-top:20px">
            <Col span="6">
              <p class="staticNum">{{person.onGuard}}</p>
              <p class="staticType">在岗</p>
            </Col>
            <Col span="6">
              <p class="staticNum">{{person.legwork}}</p>
              <p class="staticType">外勤</p>
            </Col>
            <Col span="6">
              <p class="staticNum">{{person.vacate}}</p>
              <p class="staticType">请假</p>
            </Col>
            <Col span="6">
              <p class="staticNum">{{person.notClock}}</p>
              <p class="staticType">未打卡</p>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </taskContainer>
</template>

<script>
import taskContainer from "@/components/taskComponents/TaskContainer";
const companyApi = require(`@/api/company`).default;

let currentDate = new Date();

export default {
  name: "AppMain",
  data() {
    return {
      dates: currentDate,
      person: {},
      presona: {}
    };
  },
  created() {
    this.getStaticsList();
    this.getStaticsList1()
  },
  components: {
    taskContainer
  },
  methods: {
    getStaticsList() {
      companyApi
        .companyStatics({
          enterpriseId: this.$store.state.user.userInfo.deptId,
          date: this.dates
        })
        .then(res => {
          this.person = res.data.data;
        });
    },
    getStaticsList1() {
      companyApi
        .companyUserStatics({
          enterpriseId: this.$store.state.user.userInfo.deptId,
        })
        .then(res => {
          this.presona = res.data.data;
        });
    },
    getDate(val) {
      this.dates=val
      this.getStaticsList()
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.staticCard {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
  .staticTitle {
    font-size: 18px;
  }
  .staticCardItem {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    p {
      text-align: center;
    }
    .staticNum {
      font-size: 16px;
    }
  }
}
</style>
