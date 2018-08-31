import {Upload, Icon, Modal} from 'antd';
import React from "react"

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount() {
    // this.props.handleUpload({payload:this.state.fileList})
    // this.state.fileList.map(x=>{
    //   this.props.handleUpload({payload:x.response})
    //   console.log(x.response)
    // })
  }

  handleCancel = () => {
    this.setState({previewVisible: false})
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
//在这里处理父组件形参
  handleChange = ({fileList}) => {
    this.setState({fileList})
    fileList.map(x => {
      this.props.handleUpload({payload: x.response})
      console.log(x.response)
    })
  }
  // beforeUpload = () => {
  //   console.log(this.state.fileList)
  //   return this.props.upload
  // }
  render() {
    // console.log(this.props.upload)
    // this.state.fileList.map(x=>{
    //   console.log(x.response)
    // })
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:8002/babyship/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
