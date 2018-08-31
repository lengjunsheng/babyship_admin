import {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PicturesWall from "./PicturesWall";

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      resp: ""
    }
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values,this.state.resp);
        this.hideModelHandler();
      }
    });
  };

  handleUpload = ({payload}) => {
    this.setState({
      resp: payload
    })
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {name, description} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input/>)
              }
            </FormItem>
            {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="url"*/}
            {/*>*/}
              {/*{*/}
                {/*getFieldDecorator('url', {*/}
                  {/*initialValue: url,*/}
                {/*})(<Input/>)*/}
              {/*}*/}
            {/*</FormItem>*/}
            <FormItem
              {...formItemLayout}
              label="description"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="img"
            >
              <PicturesWall handleUpload={this.handleUpload}/>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
