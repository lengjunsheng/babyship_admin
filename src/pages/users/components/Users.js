import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current,roles }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    values.id = id
    dispatch({
      type: 'users/patch',
      payload: values ,
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/createUser',
      payload: values,
    });
  }

  const columns = [
    {
      title: '登录名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '真实姓名',
      dataIndex: 'cnName',
      key: 'cnName',
    },
    {
      title: '角色',
      dataIndex: 'rolea',
      key: 'rolea',
    },
    {
      title: '概述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)} roles = {roles}>
            <a>编辑</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
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
          <UserModal record={{}} onOk={createHandler} roles = {roles}>
            <Button type="primary">添加用户</Button>
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
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page, roles } = state.users;
  return {
    list,
    total,
    page,
    roles,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(Users);
