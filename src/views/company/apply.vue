<template>
  <taskContainer title="申请进度" :isShade="true">
    <p v-show="enterpriseDetail.currentApproveNode==0">您尚未点击申请复工，请及时填报资料申请复工！！！</p>
    <Row v-show="enterpriseDetail.currentApproveNode!=0">
      <Form>
        <Col span="24">
          <p
            class="applyTitle applyP" :style="{color:enterpriseDetail.currentApproveNode==5?'#FF0000':enterpriseDetail.currentApproveNode==4?'#009966':'#FF9966'}"
          >{{enterpriseDetail.currentApproveNode==5?'已驳回':enterpriseDetail.currentApproveNode==4?'已通过':'待审核'}}</p>
        </Col>
        <Col span="24">
          <Row v-if="enterpriseDetail.parkApproveDeptName!=''">
            <Col span="24">
              <p class="applyTitle applyP">{{enterpriseDetail.parkApproveDeptName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批人：{{enterpriseDetail.parkApproveUserName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批结果：{{enterpriseDetail.parkApproveOperate==1?"已通过":'已驳回'}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">时 间：{{enterpriseDetail.parkApproveTime}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">问 题：{{enterpriseDetail.parkApproveRejectNote}}</p>
            </Col>
          </Row>
          <Row v-if="enterpriseDetail.streetApproveDeptName!=''">
            <Col span="24">
              <p class="applyTitle applyP">{{enterpriseDetail.streetApproveDeptName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批人：{{enterpriseDetail.streetApproveDeptName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批结果：{{enterpriseDetail.streetApproveOperate==1?"已通过":'已驳回'}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">时 间：{{enterpriseDetail.streetApproveTime}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">问 题：{{enterpriseDetail.streetApproveRejectNote}}</p>
            </Col>
          </Row>
          <Row v-if="enterpriseDetail.officeApproveDeptName!=''">
            <Col span="24">
              <p class="applyTitle applyP">{{enterpriseDetail.officeApproveDeptName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批人：{{enterpriseDetail.officeApproveUserName}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">审批结果：{{enterpriseDetail.officeApproveOperate==1?"已通过":'已驳回'}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">时 间：{{enterpriseDetail.officeApproveTime}}</p>
            </Col>
            <Col span="24">
              <p class="applyP">问 题：{{enterpriseDetail.officeApproveRejectNote}}</p>
            </Col>
          </Row>
        </Col>
      </Form>
    </Row>
  </taskContainer>
</template>

<script>
import taskContainer from "@/components/taskComponents/TaskContainer";

const companyApi = require(`@/api/company`).default;
export default {
  name: "AppMain",
  data() {
    return {
      enterpriseDetail: {},
      enterpriseId: ""
    };
  },
  created() {
    this.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.getCompanyDetail();
  },
  components: {
    taskContainer
  },
  methods: {
    getCompanyDetail() {
      companyApi
        .companyDetail({
          enterpriseId: this.enterpriseId
        })
        .then(res => {
          this.enterpriseDetail = res.data.data;
        });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="less" scoped>
.applyTitle {
  font-size: 20px;
  font-weight: bold;
}
.applyP {
  margin: 10px 0px;
}
</style>
