import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';
import React from "react"
class Users extends React.Component{
  constructor(){
    super()
    this.state = {
      editorHtml: '',
      editorText: '',
    }
  }

  deleteHandler(id) {
    this.props.dispatch({
      type: 'issues/remove',
      payload: id,
    });
  }

  pageChangeHandler(page) {
    this.props.dispatch(routerRedux.push({
      pathname: '/issues',
      query: { page },
    }));
  }

  //这边的editor其实已经加入到values了
  // 上边是错误注释
  editHandler(id, values,editor) {
    console.log("***********"+JSON.stringify(values)+"******"+editor)
    values.id = id;
    if(editor !== null)
      values.editor = editor;
    this.props.dispatch({
      type: 'issues/patch',
      payload:  values ,
    });
  }

  createHandler(values,editor) {
    this.props.dispatch({
      type: 'issues/createTeacher',
      payload: {values,editor}
    });
  }


render(){
    const dataSource = this.props.list;
    const current = this.props.page;
    const loading = this.props.loading;
    const total = this.props.total
  const columns = [
    {
      title:'ID',
      dataIndex:'id',
      key:'id',
    },
    {
      title: 'bug标题',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      width: 600,
      title: '简单描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={this.editHandler.bind(this, record.id)} >
            <a>修改</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler.bind(this, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={this.createHandler.bind(this)}>
            <Button type="primary">添加bug</Button>
          </UserModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler.bind(this)}
        />
      </div>
    </div>
  );}
}

function mapStateToProps(state) {
  const { list, total, page } = state.issues;
  return {
    list,
    total,
    page,
    loading: state.loading.models.issues,
  };
}

export default connect(mapStateToProps)(Users);
