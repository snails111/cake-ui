import React, { Component } from 'react';
import CodeStatus from "../../../components/codeStatus.jsx"
import Doc from "../../../components/doc.jsx";
import { Upload, message, Button,Space } from 'antd';
import { UploadOutlined,DownloadOutlined,CloseOutlined,PlusOutlined } from '@ant-design/icons';

//组件属性
const propsConfig = [
    {
        key: "accept",
        param: "accept",
        explain: "接受上传的文件类型",
        type: "string",
        defaultValue: ".doc,.docx,application/msword"
    },
    {
        key: "action",
        param: "action",
        explain: "上传的地址",
        type: "string",
        defaultValue: ""
    },
    {
        key: "headers",
        param: "headers",
        explain: "上传的请求头部",
        type: "object",
        defaultValue: "{}"
    },
    {
        key: "method",
        param: "method",
        explain: "上传请求的 http method",
        type: "string",
        defaultValue: "post"
    },
    {
        key: "name",
        param: "name",
        explain: "发到后台的文件参数名",
        type: "string",
        defaultValue: "file"
    },
    {
        key: "data",
        param: "data",
        explain: "上传所需额外参数 或 返回上传额外参数的方法",
        type: "object | function",
        defaultValue: "{} | (file)=>{}"
    },
    {
        key: "withCredentials",
        param: "withCredentials",
        explain: "上传请求时是否携带 cookie",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "defaultFileList",
        param: "defaultFileList",
        explain: "默认已经上传的文件列表",
        type: "array",
        defaultValue: "[]"
    },
    {
        key: "fileList",
        param: "fileList",
        explain: "上传的文件列表（受控），若有url字段则可预览",
        type: "array",
        defaultValue: "[]"
    },
    {
        key: "multiple",
        param: "multiple",
        explain: "是否支持多选文件（按住ctrl）",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "disabled",
        param: "disabled",
        explain: "是否禁用",
        type: "boolean",
        defaultValue: "false"
    },
    {
        key: "listType",
        param: "listType",
        explain: "上传列表的内建样式",
        type: "string",
        defaultValue: "text（默认）、picture、picture-card"
    },

    {
        key: "showUploadList",
        param: "showUploadList",
        explain: "是否展示文件列表",
        type: "boolean|object",
        defaultValue: "true | {showPreviewIcon:false,showDownloadIcon:true,downloadIcon:'下载',showRemoveIcon:true,removeIcon:'删除'}"
    },
    {
        key: "previewFile",
        param: "previewFile",
        explain: "自定义文件预览逻辑",
        type: "function",
        defaultValue: "(file)=>{}"
    },
    {
        key: "customRequest",
        param: "customRequest",
        explain: "覆盖默认的上传行为，自定义上传",
        type: "function",
        defaultValue: "(file, fileList) => {}"
    },
    {
        key: "beforeUpload",
        param: "beforeUpload",
        explain: "上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。",
        type: "function",
        defaultValue: "(file, fileList) => {}"
    },
    {
        key: "onChange",
        param: "onChange",
        explain: "上传文件改变状态的回调",
        type: "function",
        defaultValue: "(file, fileList) => {}"
    },
    {
        key: "onPreview",
        param: "onPreview",
        explain: "点击文件链接或预览图标时的回调",
        type: "function",
        defaultValue: "(file) => {}"
    },
    {
        key: "onDownload",
        param: "onDownload",
        explain: "点击下载文件时的回调（如果没有指定，则默认跳转到文件 url 对应的标签页）",
        type: "function",
        defaultValue: "(file) => {}"
    },
    {
        key: "onRemove",
        param: "onRemove",
        explain: "点击移除文件时的回调（返回值为 false 时不移除）",
        type: "function",
        defaultValue: "(file) => {}"
    },
    {
        key: "transformFile",
        param: "transformFile",
        explain: "在上传之前转换文件",
        type: "function",
        defaultValue: "(file) => {}"
    },
];

export default class BadgeDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          fileList1:[],
          fileList3: [
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'http://www.baidu.com/xxx.png',
            },
          ],
          fileList4: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-2',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-3',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-4',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
              uid: '-5',
              name: 'image.png',
              status: 'error',
            },
          ],
        }
    }
    

    render() {
      const props1 = {
        name: 'file', //发到后台的文件参数名，默认 'file' 字段
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {authorization: 'authorization-text'},
        accept:".doc,.docx,application/msword",
        fileList: this.state.fileList1, //受控
        onChange:({ file, fileList }) =>{
          // 验证上传文件类型
          const accept=['.doc','.docx','application/msword']
          if(!accept.includes(file.type)){
            message.warning(`仅支持上传 ${accept.join("、")}`);
            return false;//停止上传
          }
          // 限制显示列表数量为1 (若fileList中每一项存在url字段，则点击文件名可打开新窗口预览)
          let fileList1 = fileList.slice(-1);
          fileList1.map(file => {
            if (file.response) {
              file.url = file.response.url;
            }
          });
          
          switch(file.status){
            case 'uploading':
              break;
            case 'done':
              message.success(`${file.name} 上传成功！`);
              break;
            case 'error':
              message.error(`${file.name} 上传失败！`);
              break;
          }
          this.setState({fileList1})
        },
      };

      const props2 = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {authorization: 'authorization-text'},
        defaultFileList: [
          {
            uid: '1',
            name: '我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
          },
          {
            uid: '2',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', 
            url: 'http://www.baidu.com/zzz.png',
          },
        ],
        onChange:({ file, fileList }) =>{
          switch(file.status){
            case 'uploading':
              break;
            case 'done':
              message.success(`${file.name} 上传成功！`);
              break;
            case 'error':
              message.error(`${file.name} 上传失败！`);
              break;
          }
        },
        showUploadList: { //自定义上传列表交互图标
          showDownloadIcon: true,
          downloadIcon: <DownloadOutlined onClick={(e)=>{}} />,
          showRemoveIcon: true,
          removeIcon: <CloseOutlined onClick={(e)=>{}} />,
        },
      };

      const props3 = {
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        fileList: this.state.fileList3, //受控
        onChange:({ file, fileList }) =>{
          // 若fileList中每一项存在url字段，则点击文件名可打开新窗口预览
          let fileList3=fileList.map(file => {
            if (file.response) {
              file.url = file.response.url;
            }
            return file
          });
          switch(file.status){
            case 'uploading':
              break;
            case 'done':
              message.success(`${file.name} 上传成功！`);
              break;
            case 'error':
              message.error(`${file.name} 上传失败！`);
              break;
          }
          this.setState({fileList3})
        },
      };

      const props4 = {
        listType: "picture-card",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        accept:"image/png,image/jpg,image/jpeg",
        fileList: this.state.fileList4, //受控
        onChange:({ file, fileList }) =>{
          // 验证上传文件类型
          const accept=['image/png','image/jpg','image/jpeg']
          if(!accept.includes(file.type)){
            message.warning(`仅支持上传 ${accept.join("、")}`);
            return false;//停止上传
          }
          // 若fileList中每一项存在url字段，则点击文件名可打开新窗口预览
          let fileList4=fileList.map(file => {
            if (file.response) {
              file.url = file.response.url;
            }
            return file
          });
          switch(file.status){
            case 'uploading':
              break;
            case 'done':
              message.success(`${file.name} 上传成功！`);
              break;
            case 'error':
              message.error(`${file.name} 上传失败！`);
              break;
          }
          this.setState({fileList4})
        },
      };
    

      return (
           <div>
              <h2>上传 示例</h2>

              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                  
                  {/* 上传文件显示单个，文件列表受控 */}
                  <div style={{width:"48%"}}>
                    <Upload {...props1}>
                      <Button>
                        <UploadOutlined /> 上传文件显示单个，文件列表受控
                      </Button>
                    </Upload>

                    <CodeStatus>{`
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

this.state = {
  fileList1:[],
}

const props1 = {
  name: 'file', //发到后台的文件参数名，默认 'file' 字段
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {authorization: 'authorization-text'},
  accept:".doc,.docx,application/msword",
  fileList: this.state.fileList1, //受控
  onChange:({ file, fileList }) =>{
    // 验证上传文件类型
    const accept=['.doc','.docx','application/msword']
    if(!accept.includes(file.type)){
      message.warning('仅支持上传'+ accept.join("、"));
      return false;//停止上传
    }
    // 限制显示列表数量为1 (若fileList中每一项存在url字段，则点击文件名可打开新窗口预览)
    let fileList1 = fileList.slice(-1);
    fileList1.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
    });
    
    switch(file.status){
      case 'uploading':
        break;
      case 'done':
        message.success(file.name + '上传成功！');
        break;
      case 'error':
        message.error(file.name + '上传失败！');
        break;
    }
    this.setState({fileList1})
  },
};

<Upload {...props1}>
  <Button>
    <UploadOutlined /> 上传文件显示单个，文件列表受控
  </Button>
</Upload>
                    `}</CodeStatus>
                  </div>


                  {/* 上传文件显示列表，自定义上传列表交互图标 */}
                  <div style={{width:"48%"}}>
                    <Upload {...props2}>
                      <Button>
                        <UploadOutlined /> 上传文件显示列表，自定义上传列表交互图标
                      </Button>
                    </Upload>

                    <CodeStatus>{`
import { Upload, message, Button } from 'antd';
import { UploadOutlined,DownloadOutlined,CloseOutlined } from '@ant-design/icons';

const props2 = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {authorization: 'authorization-text'},
  defaultFileList: [
    {
      uid: '1',
      name: '我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片我是名字超长的图片.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', 
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  onChange:({ file, fileList }) =>{
    switch(file.status){
      case 'uploading':
        break;
      case 'done':
        message.success(file.name + '上传成功！');
        break;
      case 'error':
        message.error(file.name + '上传失败！');
        break;
    }
  },
  showUploadList: { //自定义上传列表交互图标
    showDownloadIcon: true,
    downloadIcon: <DownloadOutlined onClick={(e)=>{}} />,
    showRemoveIcon: true,
    removeIcon: <CloseOutlined onClick={(e)=>{}} />,
  },
};

<Upload {...props2}>
  <Button>
    <UploadOutlined /> 上传文件显示列表，自定义上传列表交互图标
  </Button>
</Upload>
                    `}</CodeStatus>
                  </div>


                  {/* 支持多选文件，文件列表受控 */}
                  <div style={{width:"48%"}}>
                    <Upload {...props3}>
                      <Button>
                        <UploadOutlined /> 支持多选文件，文件列表受控
                      </Button>
                    </Upload>

                    <CodeStatus>{`
import { Upload, message, Button } from 'antd';
import { UploadOutlined,DownloadOutlined,CloseOutlined } from '@ant-design/icons';

this.state = {
  fileList3: [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ],
}

const props3 = {
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {authorization: 'authorization-text'},
  fileList: this.state.fileList3, //受控
  onChange:({ file, fileList }) =>{
    // 若fileList中每一项存在url字段，则点击文件名可打开新窗口预览
    let fileList3=fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file
    });
    switch(file.status){
      case 'uploading':
        break;
      case 'done':
        message.success(file.name + '上传成功！');
        break;
      case 'error':
        message.error(file.name + '上传失败！');
        break;
    }
    this.setState({fileList3})
  },
};

<Upload {...props3}>
  <Button>
    <UploadOutlined /> 支持多选文件，文件列表受控
  </Button>
</Upload>

                    `}</CodeStatus>
                  </div>



                  {/* 上传文件图片格式，文件列表受控 */}
                  <div style={{width:"48%"}}>
                    <Upload {...props4}>
                      {
                        this.state.fileList4.length >= 8 ? null : 
                          <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">上传图片</div>
                          </div>
                      }
                    </Upload>

                    <CodeStatus>{`
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

this.state = {
  fileList4: [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ],
}

const props4 = {
  listType: "picture-card",
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept:"image/png,image/jpg,image/jpeg",
  fileList: this.state.fileList4, //受控
  onChange:({ file, fileList }) =>{
    // 验证上传文件类型
    const accept=['image/png','image/jpg','image/jpeg']
    if(!accept.includes(file.type)){
      message.warning('仅支持上传' + 'accept.join("、")');
      return false;//停止上传
    }
    // 若fileList中每一项存在url字段，则点击文件名可打开新窗口预览
    let fileList4=fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file
    });
    switch(file.status){
      case 'uploading':
        break;
      case 'done':
        message.success(file.name + '上传成功！');
        break;
      case 'error':
        message.error(file.name + '上传失败！');
        break;
    }
    this.setState({fileList4})
  },
};

<Upload {...props4}>
  {
    this.state.fileList4.length >= 8 ? null : 
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
  }
</Upload>
                    `}</CodeStatus>
                  </div>


              </div>

               

              {/* 参数说明 */}
              <h2>组件属性</h2>
              <Doc dataList={propsConfig} />
           </div>
        );
    }
}
