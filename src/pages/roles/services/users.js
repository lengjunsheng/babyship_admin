import { PAGE_SIZE } from '../constants';
import request from '../../../utils/oldrequest';

export function fetch({ page = 1 }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
export function fetchUser({ page = 1 }) {
  return request(`http://localhost:8002/babyship/allRole?pageNum=${page}&pageSize=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(`http://localhost:8002/babyship/deleteRole?id=${id}`);
}

export function patch(values) {
  const p = values.payload
  console.log(typeof p)
  console.log(p)
  let fd = new FormData()
  for (let o in p) {
    fd.append(o, p[o])
  }
  return request(`http://localhost:8002/babyship/updateRole`, {
    method: 'POST',
    body: fd,
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function createUser({payload}) {
  console.log(typeof payload)
  console.log(payload)
  let fd = new FormData()
  for (let o in payload) {
    fd.append(o, payload[o])
  }
  return request('http://localhost:8002/babyship/addRole', {
    method: 'POST',
    body: fd,
  });
}

