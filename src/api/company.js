import Vue from 'vue'
import config from '@/config'

export default {
  companyDetail(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/getEnterpriseInfoDetail`, data)
  },
  resumeBase(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/updateEnterpriseResumeInfo`, data)
  },
  editCompany(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/updateEnterpriseBaseInfo`, data)
  },
  saveFile(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/saveResumeExtFile`, data)
  },
  submitEnterpriseInfo(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/submitEnterpriseInfo`, data)
  },
  doneTask(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/doneTask`, data)
  },
  industryTemp(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/template/getTemplateByIndustryType`, data)
  },
  workerList(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/findEnterprisePage`, data)
  },
  addWorker(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/addEnterpriseUser`, data)
  },
  editWorker(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/updateUserInfo`, data)
  },
  delWorker(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/delUser`, data)
  },
  cardList(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/record/findListByCount`, data)
  },
  exportCard(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/record/deriveExcel`, data, {  responseType: 'blob' })
  },
  setRecord(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/setRecordArea`, data)
  },
  staticsList(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/statisticsData`, data)
  },
  companyStatics(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/enterpriseUserRecordStatistics`, data)
  },
  companyUserStatics(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/user/enterpriseUserStatistics`, data)
  },
  troubleList(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/getHiddenDangerListByEnterpriseId`, data)
  },
  addTrouble(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/saveHiddenDangerInfo`, data)
  },
  editTrouble(data){
    return Vue.axios.post(`${config.base_url}/roses-qy-bak/enterprise/updateHiddenDangerInfo`, data)
  }
}