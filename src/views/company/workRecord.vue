<template>
  <taskContainer title="复工备案" btn-title="点击预览" @taskBtnMethod="openCompanyDetail">
    <Row style="margin-bottom:10px">
      <Col span="2" offset="20">
        <Button @click="openTemp">模板下载</Button>
      </Col>
      <Col span="2">
        <Button
          type="primary"
          @click="submit"
          v-show="enterpriseDetail.currentApproveNode==0 || enterpriseDetail.currentApproveNode==5 "
        >提交申请</Button>
      </Col>
    </Row>
    <Table border :columns="tableCol" :data="tableData"></Table>

    <Modal title="模板下载" v-model="tempModal" width="700">
      <Row>
        <Col span="24">
          <p class="detailtitle">3 企业人员疫情防控信息采集表</p>
          <p v-show="industryTemp.preControlInfoFileId==''">无</p>
          <Button
            v-show="industryTemp.preControlInfoFileId!=''"
            @click="downFile.downLoadFile(industryTemp.preControlInfoFileId,'企业人员疫情防控信息采集表')"
          >下载</Button>
        </Col>
        <Col span="24">
          <p class="detailtitle">4 企业复工备案申请表</p>
          <p v-show="industryTemp.resumeRecordFileId==''">无</p>
          <Button
            v-show="industryTemp.resumeRecordFileId!=''"
            @click="downFile.downLoadFile(industryTemp.resumeRecordFileId,'企业复工备案申请表')"
          >下载</Button>
        </Col>
        <Col span="24">
          <p class="detailtitle">5 企业复工方案</p>
          <p v-show="industryTemp.resumePlanFileId==''">无</p>
          <Button
            v-show="industryTemp.resumePlanFileId!=''"
            @click="downFile.downLoadFile(industryTemp.resumePlanFileId,'企业复工方案')"
          >下载</Button>
        </Col>
        <Col span="24">
          <p class="detailtitle">6 企业复工承诺书</p>
          <p v-show="industryTemp.resumePromiseFileId==''">无</p>
          <Button
            v-show="industryTemp.resumePromiseFileId!=''"
            @click="downFile.downLoadFile(industryTemp.resumePromiseFileId,'企业复工承诺书')"
          >下载</Button>
        </Col>
        <Col span="24">
          <p class="detailtitle">7 企业疫情防控应急预案</p>
          <p v-show="industryTemp.preControlEmergencyPlanFileId==''">无</p>
          <Button
            v-show="industryTemp.preControlEmergencyPlanFileId!=''"
            @click="downFile.downLoadFile(industryTemp.preControlEmergencyPlanFileId,'企业疫情防控应急预案')"
          >下载</Button>
        </Col>
        <Col span="24">
          <p class="detailtitle">8 企业复工全员健康台账</p>
          <p v-show="industryTemp.wholeHealthLedgerFileId==''">无</p>
          <Button
            v-show="industryTemp.wholeHealthLedgerFileId!=''"
            @click="downFile.downLoadFile(industryTemp.wholeHealthLedgerFileId,'企业复工全员健康台账')"
          >下载</Button>
        </Col>
        
        <Col span="24">
          <p class="detailtitle">9企业员工健康情况申报卡(非必填)</p>
          <p v-show="industryTemp.healthDeclareCardFileId==''">无</p>
          <Button
            v-show="industryTemp.healthDeclareCardFileId!=''"
            @click="downFile.downLoadFile(industryTemp.healthDeclareCardFileId,'企业员工健康情况申报卡')"
          >下载</Button>
        </Col>
        
      </Row>
    </Modal>
    <Modal title="企业基本信息" v-model="baseInfoModal" width="700" ok-text="修改" @on-ok="openChange">
      <Row>
        <Form>
          <Col span="12">
            <FormItem label="企业名称">
              <p>{{enterpriseDetail.enterpriseName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="统一社会信用代码">
              <p>{{enterpriseDetail.creditCode}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="区内从业人数">
              <p>{{enterpriseDetail.employNum==0?"100以下":"100以上"}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="企业经营所在地">
              <p>{{enterpriseDetail.workAddress}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属行业">
              <p>{{enterpriseDetail.industryTypeName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="企业经营地址">
              <p>{{enterpriseDetail.businessAddress}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="法人代表">
              <p>{{enterpriseDetail.legalPersonName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系方式">
              <p>{{enterpriseDetail.legalPersonPhone}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系人">
              <p>{{enterpriseDetail.linkManName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号码（登录账号，不可更改）">
              <p>{{enterpriseDetail.linkManPhone}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属楼宇（非必填）">
              <p>{{enterpriseDetail.building}}</p>
            </FormItem>
          </Col>
          <Col span="24">
            <p style="color:#FF0000">可修改：企业经营所在地，企业经营地址，所属楼宇</p>
          </Col>
        </Form>
      </Row>
    </Modal>
    <Modal title="复工备案信息" v-model="recordsModal" @on-ok="addRecords">
      <Row>
        <Form>
          <Col span="12">
            <FormItem label="拟复工时间">
              <DatePicker
                type="date"
                v-model="recordsData.resumeDate"
                format="yyyy-MM-dd"
                :options="options3"
                @on-change="getDate"
                placeholder="注册时间"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="拟复工人数">
              <Input v-model="recordsData.resumeEmployNum" />
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
    <Modal title="修改" v-model="editInfo" @on-ok="edit">
      <Row>
        <Form>
          <Col span="24">
            <FormItem label="企业经营所在地">
              <Input v-model="editInfoData.businessAddress" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="企业经营地址">
              <Input v-model="editInfoData.workAddress" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="所属楼宇">
              <Input v-model="editInfoData.building" />
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
    <Modal
      title="上传资料"
      v-model="upModal"
      @on-ok="saveTemplete(fileUpData,fileType)"
      @on-cancel="closeUploadFile"
    >
      <Form>
        <FormItem label="附件上传">
          <UploadFiles
            v-if="fileType==3"
            @getFileData="getFileData"
            :fileNum="1"
            :defaultList="defaultList3"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==4"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList4"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==5"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList5"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==6"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList6"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==7"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList7"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==8"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList8"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==9"
            @getFileData="getFileData"
            :fileNum="10"
            :defaultList="defaultList9"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==10"
            :fileNum="10"
            @getFileData="getFileData"
            :defaultList="defaultList10"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==11"
            :fileNum="10"
            @getFileData="getFileData"
            :defaultList="defaultList11"
          ></UploadFiles>
          <UploadFiles
            v-if="fileType==12"
            :fileNum="10"
            @getFileData="getFileData"
            :defaultList="defaultList12"
          ></UploadFiles>
        </FormItem>
      </Form>
    </Modal>
    <Modal title="详情" v-model="isDetail" width="800">
      <Row>
        <Form>
          <p class="detailtitle">1 基本信息</p>
          <Col span="12">
            <FormItem label="企业名称">
              <p>{{enterpriseDetail.enterpriseName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="统一社会信用代码">
              <p>{{enterpriseDetail.creditCode}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="区内从业人数">
              <p>{{enterpriseDetail.employNum==0?"100以下":"100以上"}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="企业经营所在地">
              <p>{{enterpriseDetail.workAddress}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属行业">
              <p>{{enterpriseDetail.industryTypeName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="企业经营地址">
              <p>{{enterpriseDetail.businessAddress}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="法人代表">
              <p>{{enterpriseDetail.legalPersonName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系方式">
              <p>{{enterpriseDetail.legalPersonPhone}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系人">
              <p>{{enterpriseDetail.linkManName}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号码（登录账号，不可更改）">
              <p>{{enterpriseDetail.linkManPhone}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属楼宇（非必填）">
              <p>{{enterpriseDetail.building}}</p>
            </FormItem>
          </Col>
          <Col span="24">
            <p class="detailtitle">2 企业复工备案信息</p>
          </Col>
          <Col span="12">
            <FormItem label="拟复工时间">
              <p>{{enterpriseDetail.resumeDate}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="拟复工人数">
              <p>{{enterpriseDetail.resumeEmployNum}}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <p class="detailtitle">3 企业人员疫情防控信息采集表</p>
            <p v-show="enterpriseDetail.preControlInfoFile==[]">无</p>
            <div v-show="enterpriseDetail.preControlInfoFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.preControlInfoFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.preControlInfoFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">8 企业复工全员健康台账</p>
            <p v-show="enterpriseDetail.wholeHealthLedgerFile==[]">无</p>
            <div v-show="enterpriseDetail.wholeHealthLedgerFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.wholeHealthLedgerFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.wholeHealthLedgerFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">4 企业复工备案申请表</p>
            <p v-show="enterpriseDetail.resumeRecordFile==[]">无</p>
            <div v-show="enterpriseDetail.resumeRecordFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.resumeRecordFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.resumeRecordFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">9企业员工健康情况申报卡(非必填)</p>
            <p v-show="enterpriseDetail.healthDeclareCardFile==[]">无</p>
            <div v-show="enterpriseDetail.healthDeclareCardFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.healthDeclareCardFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.healthDeclareCardFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">5 企业复工方案</p>
            <p v-show="enterpriseDetail.resumePlanFile==[]">无</p>
            <div v-show="enterpriseDetail.resumePlanFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.resumePlanFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.resumePlanFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">10 器材物资准备情况</p>
            <p v-show="enterpriseDetail.equipmentMaterialPrepareFile==[]">无</p>
            <div v-show="enterpriseDetail.equipmentMaterialPrepareFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.equipmentMaterialPrepareFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.equipmentMaterialPrepareFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">6 企业复工承诺书</p>
            <p v-show="enterpriseDetail.resumePromiseFile==[]">无</p>
            <div v-show="enterpriseDetail.resumePromiseFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.resumePromiseFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.resumePromiseFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">11 复工复产安全生产方案和应急措施</p>
            <p v-show="enterpriseDetail.safetyPlanEmergencyMeasuresFile==[]">无</p>
            <div v-show="enterpriseDetail.safetyPlanEmergencyMeasuresFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.safetyPlanEmergencyMeasuresFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.safetyPlanEmergencyMeasuresFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">7 企业疫情防控应急预案</p>
            <p v-show="enterpriseDetail.preControlEmergencyPlanFile==[]">无</p>
            <div v-show="enterpriseDetail.preControlEmergencyPlanFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.preControlEmergencyPlanFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.preControlEmergencyPlanFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
          <Col span="12">
            <p class="detailtitle">12 复工复产前安全教育培训情况</p>
            <p v-show="enterpriseDetail.safetyTrainingFile==[]">无</p>
            <div v-show="enterpriseDetail.safetyTrainingFile!=[]">
              <p>下载链接列表</p>
              <p
                class="downHref"
                v-for="(item) in enterpriseDetail.safetyTrainingFile"
                :key="item.fileId"
                @click="downFile.downLoadFile(item.fileId,item.fileOriginName)"
              >{{item.fileOriginName}}</p>
              <p>预览列表</p>
              <p
                class="downHref"
                v-for="(item,index) in enterpriseDetail.safetyTrainingFile"
                :key="'index-'+index"
                @click="review(item.fileUrl)"
              >{{item.fileOriginName}}</p>
            </div>
          </Col>
        </Form>
      </Row>
      <!-- <div slot="footer">
        <Button type="primary" @click="doneTask(1)">批准</Button>
        <Button @click="doSuggess">驳回</Button>
      </div>-->
    </Modal>
    <Modal title="审批" v-model="suggess" @on-ok="doneTask(2)">
      <Form>
        <FormItem label="驳回意见">
          <Input type="textarea" v-model="approveRejectNote" />
        </FormItem>
      </Form>
    </Modal>
  </taskContainer>
</template>

<script>
import taskContainer from "@/components/taskComponents/TaskContainer";
import downFile from "@/assets/js/commenTask";
import UploadFiles from "@/components/UploadFiles";
const companyApi = require(`@/api/company`).default;

export default {
  name: "AppMain",
  data() {
    return {
      downFile,
      tempModal: false,
      baseInfoModal: false,
      editInfo: false,
      recordsModal: false,
      upModal: false,
      isDetail: false,
      suggess: false,
      fileType: 3,
      fileUpData: "",
      tableCol: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "类目",
          key: "type"
        },
        {
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    color: "rgb(0, 102, 255)",
                    cursor: "pointer",
                    display: params.row.typeIndex == 1 ? "" : "none"
                  },
                  on: {
                    click: () => {
                      this.openDetail();
                    }
                  }
                },
                "点击查看"
              ),
              h(
                "p",
                {
                  style: {
                    color: "rgb(0, 102, 255)",
                    cursor: "pointer",
                    display: params.row.typeIndex == 2 ? "" : "none"
                  },
                  on: {
                    click: () => {
                      this.openRecords();
                    }
                  }
                },
                "点击填写"
              ),
              h(
                "p",
                {
                  style: {
                    color: "rgb(0, 102, 255)",
                    cursor: "pointer",
                    display:
                      params.row.typeIndex != 1 &&
                      params.row.typeIndex != 2 &&
                      params.row.fileType.length == 0
                        ? ""
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.upModal = true;
                      this.fileType = params.row.typeIndex;
                    }
                  }
                },
                "点击上传"
              ),
              h(
                "p",
                {
                  style: {
                    color: "rgb(0, 102, 255)",
                    cursor: "pointer",
                    display:
                      params.row.typeIndex != 1 &&
                      params.row.typeIndex != 2 &&
                      params.row.fileType.length > 0
                        ? ""
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.upModal = true;
                      this.fileType = params.row.typeIndex;
                    }
                  }
                },
                "已有文件，重新上传"
              )
            ]);
          }
        }
      ],
      tableData: [
        {
          type: "企业基本信息",
          typeIndex: 1,
          fileType: []
        },
        {
          type: "企业复工备案信息",
          typeIndex: 2,
          fileType: []
        },
        {
          type: "企业人员疫情防控信息采集表",
          typeIndex: 3,
          fileType: []
        },
        {
          type: "企业复工备案申请表",
          typeIndex: 4,
          fileType: []
        },
        {
          type: "企业复工方案",
          typeIndex: 5,
          fileType: []
        },
        {
          type: "企业疫情防控承诺书",
          typeIndex: 6,
          fileType: []
        },
        {
          type: "企业疫情防控应急预案",
          typeIndex: 7,
          fileType: []
        },
        {
          type: "企业复工全员健康台账",
          typeIndex: 8,
          fileType: []
        },
        {
          type: "企业员工健康申报卡（非必填）",
          typeIndex: 9,
          fileType: []
        },
        {
          type: "器材物质准备情况",
          typeIndex: 10,
          fileType: []
        },
        {
          type: "复工复产安全生产方案与应急措施",
          typeIndex: 11,
          fileType: []
        },
        {
          type: "复工复产前安全教育培训情况",
          typeIndex: 12,
          fileType: []
        }
      ],
      searchData: {
        current: 1,
        size: 10
      },
      total: 0,
      enterpriseId: "",
      enterpriseDetail: {},
      editInfoData: {
        enterpriseId: "",
        businessAddress: "",
        workAddress: "",
        building: ""
      },
      recordsData: {
        enterpriseId: "",
        resumeDate: "",
        resumeEmployNum: ""
      },
      defaultList3: [],
      defaultList4: [],
      defaultList5: [],
      defaultList6: [],
      defaultList7: [],
      defaultList8: [],
      defaultList9: [],
      defaultList10: [],
      defaultList11: [],
      defaultList12: [],
      approveRejectNote: "",
      industryTemp: [],
      industryType: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  created() {
    this.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.editInfoData.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.recordsData.enterpriseId = this.$store.state.user.userInfo.deptId;
    this.getCompanyDetail();
  },
  components: {
    taskContainer,
    UploadFiles
  },
  inject: ["reload"],
  methods: {
    openTemp() {
      this.tempModal = true;
      this.getTempList();
    },
    openDetail() {
      this.baseInfoModal = true;
    },
    openChange() {
      this.editInfo = true;
    },
    openRecords() {
      this.recordsModal = true;
    },
    openCompanyDetail() {
      this.isDetail = true;
    },
    closeUploadFile() {
      this.upModal = false;
      this.fileUpData = "";
      this.reload()
    },
    getDate(val) {
      this.recordsData.resumeDate = val;
    },
    getFileData(data) {
      this.fileUpData = data.join(",");
    },
    getTempList() {
      companyApi
        .industryTemp({
          industryType: this.industryType
        })
        .then(res => {
          this.industryTemp = res.data.data;
        });
    },
    getCompanyDetail() {
      companyApi
        .companyDetail({
          enterpriseId: this.enterpriseId
        })
        .then(res => {
          this.enterpriseDetail = res.data.data;
          this.recordsData.resumeDate = res.data.data.resumeDate;
          this.recordsData.resumeEmployNum = res.data.data.resumeEmployNum;
          this.industryType = res.data.data.industryType;
          this.editInfoData.businessAddress = res.data.data.businessAddress;
          this.editInfoData.workAddress = res.data.data.workAddress;
          this.editInfoData.building = res.data.data.building;
          this.tableData[2].fileType = res.data.data.preControlInfoFile;
          this.defaultList3 = downFile.editUpload(
            res.data.data.preControlInfoFile
          ).default;
          this.tableData[3].fileType = res.data.data.resumeRecordFile;
          this.defaultList4 = downFile.editUpload(
            res.data.data.resumeRecordFile
          ).default;
          this.tableData[4].fileType = res.data.data.resumePlanFile;
          this.defaultList5 = downFile.editUpload(
            res.data.data.resumePlanFile
          ).default;
          this.tableData[5].fileType = res.data.data.resumePromiseFile;
          this.defaultList6 = downFile.editUpload(
            res.data.data.resumePromiseFile
          ).default;
          this.tableData[6].fileType =
            res.data.data.preControlEmergencyPlanFile;
          this.defaultList7 = downFile.editUpload(
            res.data.data.preControlEmergencyPlanFile
          ).default;
          this.tableData[7].fileType = res.data.data.wholeHealthLedgerFile;
          this.defaultList8 = downFile.editUpload(
            res.data.data.wholeHealthLedgerFile
          ).default;
          this.tableData[8].fileType = res.data.data.healthDeclareCardFile;
          this.defaultList9 = downFile.editUpload(
            res.data.data.healthDeclareCardFile
          ).default;
          this.tableData[9].fileType =
            res.data.data.equipmentMaterialPrepareFile;
          this.defaultList10 = downFile.editUpload(
            res.data.data.equipmentMaterialPrepareFile
          ).default;

          this.tableData[10].fileType =
            res.data.data.safetyPlanEmergencyMeasuresFile;
          this.defaultList11 = downFile.editUpload(
            res.data.data.safetyPlanEmergencyMeasuresFile
          ).default;
          this.tableData[11].fileType = res.data.data.safetyTrainingFile;
          this.defaultList12 = downFile.editUpload(
            res.data.data.safetyTrainingFile
          ).default;
        });
    },
    edit() {
      companyApi
        .editCompany(this.editInfoData)
        .then(() => {
          this.$Message.success("修改成功");
          this.reload();
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
        });
    },
    addRecords() {
      companyApi
        .resumeBase(this.recordsData)
        .then(() => {
          this.$Message.success("操作成功");
          this.reload();
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
        });
    },
    saveTemplete(fileId, num) {
      companyApi
        .saveFile({
          enterpriseId: this.enterpriseId,
          fileId: fileId,
          extFileType: num
        })
        .then(() => {
          this.$Message.success("添加成功");
          setTimeout(() => {
            this.reload();
          }, 1000);
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
        });
    },
    submit() {
      companyApi
        .submitEnterpriseInfo({
          enterpriseId: this.enterpriseId
        })
        .then(() => {
          this.$Message.success("提交成功");
          setTimeout(() => {
            this.reload();
          }, 1000);
        })
        .catch(err => {
          this.$Message.error(err.response.data.message);
        });
    },
    doSuggess() {
      this.suggess = true;
    },
    doneTask(status) {
      companyApi
        .doneTask({
          enterpriseId: this.enterpriseId,
          approveOperate: status,
          approveRejectNote: this.approveRejectNote
        })
        .then(() => {
          this.$Message.success("操作成功");
          setTimeout(() => {
            this.reload();
          }, 1000);
        })
        .catch(err => {
          this.$Message.err(err.response.data.message);
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
.detailtitle {
  font-weight: bold;
  margin: 10px 0px;
}
.downHref {
  color: #2d8cf0;
  cursor: pointer;
}
</style>
