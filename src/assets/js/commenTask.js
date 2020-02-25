import _ from 'lodash';
import config from '@/config';

function formatDate(date) {
  date = date == '' ? '' : date.split(' ')[0];
  return date;
}

function editUpload(detailArr) {
  let uploadArr = {
    default: [],
    fileArr: []
  };
  let fileArr = [];
  detailArr.map(el => {
    let imgObj = {
      name: el.fileOriginName,
      url: el.fileUrl,
      data: el.fileId
    };
    fileArr.push(el.fileId);
    uploadArr.default.push(imgObj);
  });
  uploadArr.fileArr = fileArr;
  return uploadArr;
}

function downLoadFile(fileId, fileName) {
  const a = document.createElement('a'); // 创建a标签
  const e = document.createEvent('MouseEvents'); // 创建鼠标事件对象
  e.initEvent('click', false, false); // 初始化事件对象
  a.href = `${config.base_url}/biz-support-file/file/download?fileId=${fileId}`; // 设置下载地址
  a.download = fileName; // 设置下载文件名
  a.dispatchEvent(e);
}
export default { formatDate, editUpload, downLoadFile };
